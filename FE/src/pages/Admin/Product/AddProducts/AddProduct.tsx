import {
  Button,
  Checkbox,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from "antd";
import { AiFillBackward } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { IAttribute } from "../../../../common/interfaces/Product";
import { PlusOutlined } from "@ant-design/icons";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";
import {
  uploadGallery,
  uploadImage,
} from "../../../../systems/utils/uploadImage";
import { Mutation_items } from "../../../../common/hooks/Products/mutation_item";

type FieldType = {
  name_product: string;
  price_product: number;
  description_product: string;
  category_id: string[];
  image_product: string;
  gallery_product: string[];
  stock_product: number;
  attributes: IAttribute[];
  featured_product: boolean;
  tag_product: string[];
};

const AddProduct = () => {
  const { data } = useCategoryQuery();
  const { mutate: addItem } = Mutation_items("CREATE");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const imageUrl = imageFile ? await uploadImage(imageFile) : "";
      const galleryUrls = await uploadGallery(galleryFiles);
      const attributesJson = JSON.stringify(values.attributes);
      const finalValues = {
        ...values,
        image_product: imageUrl,
        gallery_product: galleryUrls,
        attributes: attributesJson,
      };
      console.log(`finalValues`, finalValues);
      addItem(finalValues);
      messageApi.success("Sản phẩm đã được thêm thành công!");
    } catch (error) {
      messageApi.error("Thêm sản phẩm thất bại");
      console.error("Lỗi:", error);
    }
  };

  const handleImageChange = (info: any) => {
    setImageFile(info.fileList.map((file: any) => file.originFileObj));
  };

  const handleGalleryChange = ({ fileList }: any) => {
    setGalleryFiles(fileList.map((file: any) => file.originFileObj));
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

            <div className="flex items-start justify-between w-2/3">
              <Form.Item<FieldType>
                label="Ảnh sản phẩm"
                name="image_product"
                rules={[
                  {
                    required: true,
                    message: "Ảnh sản phẩm là bắt buộc!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                  </button>
                </Upload>
              </Form.Item>

              <Form.Item<FieldType>
                label="Bộ sưu tập"
                name="gallery_product"
                rules={[
                  {
                    required: true,
                    message: "Bộ sưu tập sản phẩm là bắt buộc!",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  onChange={handleGalleryChange}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                  </button>
                </Upload>
              </Form.Item>
            </div>

            <Form.Item<FieldType>
              label="Giá sản phẩm"
              name="price_product"
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
            </Form.Item>

            <Form.Item<FieldType>
              label="Mô tả sản phẩm"
              name="description_product"
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.List name="attributes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, "color"]}
                        label="Màu sắc"
                        rules={[
                          { required: true, message: "Vui lòng nhập màu sắc!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.List name={[name, "size"]}>
                        {(sizeFields, { add: addSize, remove: removeSize }) => (
                          <>
                            {sizeFields.map(
                              ({
                                key: sizeKey,
                                name: sizeName,
                                ...restSizeField
                              }) => (
                                <div
                                  key={sizeKey}
                                  className="flex items-center gap-[13px] mb-2"
                                >
                                  <Form.Item
                                    {...restSizeField}
                                    name={[sizeName, "name_size"]}
                                    label="Kích cỡ"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập kích cỡ!",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Kích cỡ" />
                                  </Form.Item>

                                  <Form.Item
                                    {...restSizeField}
                                    name={[sizeName, "stock_attribute"]}
                                    label="Tồn kho"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập số lượng!",
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      placeholder="Số lượng"
                                      className="w-[183px]"
                                    />
                                  </Form.Item>

                                  <Form.Item
                                    {...restSizeField}
                                    name={[sizeName, "price_attribute"]}
                                    label="Giá"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Vui lòng nhập giá!",
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      placeholder="Giá"
                                      className="w-[183px]"
                                    />
                                  </Form.Item>

                                  <Button
                                    onClick={() => removeSize(sizeName)}
                                    className="mt-1"
                                  >
                                    Xóa kích cỡ
                                  </Button>
                                </div>
                              )
                            )}
                            <div className="flex gap-3">
                              <Form.Item>
                                <Button
                                  type="primary"
                                  onClick={() => addSize()}
                                  block
                                >
                                  Thêm kích cỡ
                                </Button>
                              </Form.Item>
                              <Button onClick={() => remove(name)} className="">
                                Xóa thuộc tính
                              </Button>
                            </div>
                          </>
                        )}
                      </Form.List>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm thuộc tính
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <div>
            <Form.Item
              label="Danh mục sản phẩm"
              name="category_id"
              rules={[
                { required: true, message: "Danh mục sản phẩm bắt buộc chọn!" },
              ]}
            >
              <Select
                placeholder="Chọn danh mục sản phẩm"
                allowClear
                options={data?.map((category: ICategory) => ({
                  value: category._id,
                  label: category.name_category,
                }))}
              ></Select>
            </Form.Item>

            <Form.Item<FieldType> label="Tags sản phẩm" name="tag_product">
              <Select
                mode="tags"
                placeholder="Nhập tags cho sản phẩm"
                notFoundContent="Không tìm thấy tags"
                allowClear
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="featured_product"
              valuePropName="checked"
            >
              <Checkbox>Sản phẩm nổi bật</Checkbox>
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
