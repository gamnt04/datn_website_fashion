import {
  Button,
  Checkbox,
  Flex,
  FormProps,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import { AiFillBackward } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SubmitHandler, useForm } from "react-hook-form";
import instance from "@/configs/axios";
import { useState } from "react";
import {
  handleImageChange,
  handleGalleryChange,
  removeImagePreview,
  removeGalleryImage,
  handleAttributeChange,
  handleSizeChange,
  handleAddAttribute,
  handleAddSize,
  handleRemoveAttribute,
  handleRemoveSize,
} from "../../../../systems/utils/eventAddPro";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
type FieldType = {
  name_product: string;
  price: number;
  image_product: string;
  description_product: string;
  featured: boolean;
  countInStock: number;
  discount: number;
  category: string[];
};
const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [attributesData, setAttributes] = useState<IAttribute[]>([
    { color: "", size: [{ name_size: "", stock_attribute: 0 }] },
  ]);
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="container mx-auto">
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl">Thêm sản phẩm</h1>
        <Link to="/admin/products">
          <Button type="primary">
            <AiFillBackward /> Quay lại
          </Button>
        </Link>
      </div>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-[auto,300px] gap-8">
          <div>
            <Form.Item<FieldType>
              label="Tên sản phẩm"
              name="name_product"
              rules={[
                { required: true, message: "Tên sản phẩm bắt buộc nhập!" },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="flex items-start justify-between w-1/2">
              <Form.Item<FieldType>
                label="Ảnh sản phẩm"
                name="image_product"
                rules={[
                  { required: true, message: "Ảnh sản phẩm là bắt buộc!" },
                ]}
              >
                <Flex gap="middle" className="mb-4" wrap>
                  <Upload
                    name="image_product"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Flex>
              </Form.Item>

              <Form.Item<FieldType>
                label="Bộ sưu tập"
                name="image_product"
                className="flex items-center"
                rules={[
                  { required: true, message: "Ảnh sản phẩm là bắt buộc!" },
                ]}
              >
                <Flex gap="middle" className="mb-4" wrap>
                  <Upload
                    name="image_product"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Flex>
              </Form.Item>
            </div>
            {/* <Form.Item<FieldType>
              label="Giá sản phẩm"
              name="price"
              rules={[
                { required: true, message: "Giá sản phẩm bắt buộc nhập!" },
                {
                  type: "number",
                  min: 0,
                  message: "Giá sản phẩm phải lớn hơn 0",
                },
              ]}
            >
              <InputNumber />
            </Form.Item> */}
            <Form.Item<FieldType>
              label="Mô tả sản phẩm"
              name="description_product"
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item<FieldType> name="featured" valuePropName="checked">
              <Checkbox>Sản phẩm nổi bật</Checkbox>
            </Form.Item>
            <Form.Item<FieldType>
              label="Sản phẩm trong kho"
              name="countInStock"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Số lượng sản phẩm phải lớn hơn 0",
                },
              ]}
            >
              <InputNumber defaultValue={0} />
            </Form.Item>
            <div>
              <div className="mb-4">
                {attributesData.map((attribute, index) => (
                  <div key={index} className="mb-4 ">
                    <div className="mb-4">
                      <label
                        htmlFor={`color-${index}`}
                        className="block mb-2 text-sm font-bold text-gray-700"
                      >
                        Màu Sắc
                      </label>
                      <input
                        type="text"
                        id={`color-${index}`}
                        value={attribute.color}
                        onChange={(e) =>
                          handleAttributeChange(
                            index,
                            e,
                            attributesData,
                            setAttributes
                          )
                        }
                        name="color"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {attribute.size.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="flex mb-4 gap-x-4">
                        <div>
                          {/* <label
                            htmlFor={`size-${index}-${sizeIndex}`}
                            className="block mb-2 text-sm font-bold text-gray-700"
                          >
                            Kích Thước
                          </label>
                          <input
                            type="text"
                            id={`size-${index}-${sizeIndex}`}
                            value={size.name_size}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sizeIndex,
                                e,
                                attributesData,
                                setAttributes
                              )
                            }
                            name="name_size"
                            className="w-[410px] px-3 py-2 border rounded"
                          /> */}
                          <Form.Item<FieldType>
                            label=" Kích Thước"
                            className="name_size"
                            rules={[
                              {
                                required: true,
                                message: "Giá sản phẩm bắt buộc nhập!",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm phải lớn hơn 0",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="flex items-center gap-x-4">
                          {/* <label
                            htmlFor={`stock-${index}-${sizeIndex}`}
                            className="block mb-2 ml-3 text-sm font-bold text-gray-700"
                          >
                            Số lượng
                          </label>
                          <input
                            type="number"
                            id={`stock-${index}-${sizeIndex}`}
                            value={size.stock_attribute}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sizeIndex,
                                e,
                                attributesData,
                                setAttributes
                              )
                            }
                            name="stock_attribute"
                            className="w-[410px] px-3 py-2 mx-3 border rounded"
                          /> */}
                          <Form.Item<FieldType>
                            label="Số lượng"
                            name="stock_attribute"
                            rules={[
                              {
                                required: true,
                                message: "Giá sản phẩm bắt buộc nhập!",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm phải lớn hơn 0",
                              },
                            ]}
                          >
                            <InputNumber />
                          </Form.Item>
                          <Form.Item<FieldType>
                            label="Giá sản phẩm"
                            name="price"
                            rules={[
                              {
                                required: true,
                                message: "Giá sản phẩm bắt buộc nhập!",
                              },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm phải lớn hơn 0",
                              },
                            ]}
                          >
                            <InputNumber />
                          </Form.Item>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSize(
                                index,
                                sizeIndex,
                                attributesData,
                                setAttributes
                              )
                            }
                            className="px-3 py-2 text-white bg-red-500 rounded "
                          >
                            Xóa Kích Thước
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddSize(index, attributesData, setAttributes)
                      }
                      className="px-4 py-2 mb-2 text-white bg-blue-500 rounded"
                    >
                      Thêm Kích Thước
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveAttribute(
                          index,
                          attributesData,
                          setAttributes
                        )
                      }
                      className="px-3 py-2 text-white bg-red-500 rounded "
                    >
                      Xóa Thuộc Tính
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleAddAttribute(attributesData, setAttributes)
                  }
                  className="px-4 py-2 text-white bg-green-500 rounded"
                >
                  Thêm Thuộc Tính
                </button>
              </div>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Danh mục sản phẩm" name="category">
              <Checkbox.Group>
                {/* {categories?.data.map((category: any) => (
                  <Checkbox key={category._id} value={category._id}>
                    {category.name}
                  </Checkbox>
                ))} */}
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
