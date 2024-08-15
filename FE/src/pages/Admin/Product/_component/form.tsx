import {
  Button,
  Checkbox,
  FormProps,
  Input,
  InputNumber,
  Select,
  Upload
} from "antd";
import { AiFillBackward } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IAttribute } from "../../../../common/interfaces/Product";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";
import useHookForm from "../../../../common/hooks/form/My_form";
import { useState } from "react";
import { Loader } from "lucide-react";

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

const Form_Item = ({ mode }: any) => {
  const [status_attr, setStatus_Attr] = useState(true);
  let image_item: any;
  let gallery_item: any = [];

  const {
    onSubmit,
    isPending,
    isError,
    handleImageChange,
    handleGalleryChange,
    loading,
    data_one_item,
  } = useHookForm({ mode });
  const { data } = useCategoryQuery();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    onSubmit(values);
  };
  if (data_one_item?.isPending) {
    return (
      <div className="fixed bg-[#17182177] w-screen h-screen top-0 right-0"></div>
    );
  }
  if (mode && data_one_item?.data?.product?.image_product) {
    image_item = [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url:
          data_one_item?.data?.product?.image_product &&
          data_one_item?.data?.product?.image_product
      }
    ];
    data_one_item?.data?.product?.gallery_product?.map(
      (uri_gallery: string | undefined, index: number) => {
        gallery_item.push({
          uid: index,
          name: "image.png",
          status: "done",
          url: uri_gallery && uri_gallery
        });
      }
    );
  }

  const initialAttributes =
    data_one_item?.data?.product?.attributes?.values || [];
  const initialValues = {
    ...data_one_item?.data?.product,
    attributes: initialAttributes.map((attr: IAttribute) => ({
      ...attr,
      size: attr.size || [{}]
    }))
  };
  return (
    <div className=" relative  text-[#1C2434] min-h-[90vh] mt-[100px] mx-10">
      {(isPending || loading) && (
        <div className="fixed z-[10] bg-[#17182177] w-screen h-screen top-0 right-0 grid place-items-center">
          <div className="animate-spin">
            <Loader />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[26px] font-semibold">
          {mode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </h1>
        <Link to="/admin/products">
          <Button type="primary">
            <AiFillBackward /> Quay lại
          </Button>
        </Link>
      </div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <div className="grid grid-cols-[60%,40%] gap-8">
          <div>
            <div>
              {" "}
              <label htmlFor="" className=" font-medium text-sm">
                Tên sản phẩm
              </label>
              <Form.Item<FieldType>
                name="name_product"
                rules={[
                  { required: true, message: "Tên sản phẩm bắt buộc nhập!" }
                ]}
              >
                <Input className="mt-2 py-2 text-[#1C2434] border-gray-600 hover:bg-[#F5F7FD] active:bg-[#active:bg-[#F5F7FD]] !outline-none " />
              </Form.Item>
            </div>
            <div className="">
              {" "}
              <label htmlFor="" className="text-[#1C2434] font-medium text-sm">
                Danh mục
              </label>
              <Form.Item
                className="mt-2"
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: "Danh mục sản phẩm bắt buộc chọn!"
                  }
                ]}
              >
                <Select
                  className="t-2 *:py-2 max-w-[200px] *:!text-[#1C2434] border-gray-600 !outline-none hover:bg-[#F5F7FD] focus:bg-[#F5F7FD] active:bg-[#F5F7FD]"
                  allowClear
                  options={data?.map((category: ICategory) => ({
                    value: category._id,
                    label: category.name_category
                  }))}
                ></Select>
              </Form.Item>
            </div>

            {status_attr && (
              <>
                <label
                  htmlFor=""
                  className="text-[#1C2434] font-medium text-sm"
                >
                  Giá sản phẩm
                </label>
                <Form.Item<FieldType>
                  name="price_product"
                  rules={[
                    { required: true, message: "Giá sản phẩm bắt buộc nhập!" },
                    {
                      type: "number",
                      min: 0,
                      message: "Giá sản phẩm phải là số dương!",
                      transform(value) {
                        return Number(value);
                      }
                    }
                  ]}
                >
                  <InputNumber className=" mt-2 py-2 max-w-[200px] border-gray-600 !outline-none hover:bg-[#F5F7FD] " />
                </Form.Item>
              </>
            )}

            <label htmlFor="" className="text-[#1C2434]font-medium text-sm">
              Mô tả sản phẩm
            </label>
            <Form.Item<FieldType> name="description_product">
              <TextArea
                className=" mt-2 py-2 max-w-[200px] border-gray-600 !outline-none hover:bg-[#F5F7FD] "
                rows={4}
              />
            </Form.Item>

            <Form.List
              name="attributes"
              initialValue={data_one_item?.data?.product?.attributes?.values}
            >
              {(fields, { add, remove }) => {
                fields.length > 0
                  ? setStatus_Attr(false)
                  : setStatus_Attr(true);
                return (
                  <>
                    <label
                      htmlFor=""
                      className="text-[#1C2434] font-medium text-sm"
                    >
                      Thuộc tính sản phẩm
                    </label>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key}>
                        <label
                          htmlFor=""
                          className="text-[#1C2434] font-medium text-sm"
                        >
                          Màu :
                        </label>
                        <Form.Item
                          {...restField}
                          name={[name, "color"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập màu sắc!"
                            }
                          ]}
                        >
                          <Input className=" mt-2 py-2 max-w-[200px] border-gray-600 !outline-none " />
                        </Form.Item>
                        <Form.List name={[name, "size"]} initialValue={[{}]}>
                          {(
                            sizeFields,
                            { add: addSize, remove: removeSize }
                          ) => (
                            <>
                              {sizeFields.map(
                                ({
                                  key: sizeKey,
                                  name: sizeName,
                                  ...restSizeField
                                }) => (
                                  <div
                                    key={sizeKey}
                                    className="flex items-center gap-[13px] mb-2 -mt-2"
                                  >
                                    <div>
                                      <label
                                        htmlFor=""
                                        className="text-[#1C2434] font-medium text-sm"
                                      >
                                        Kích cỡ :
                                      </label>
                                      <Form.Item
                                        {...restSizeField}
                                        name={[sizeName, "name_size"]}
                                      >
                                        <Input className=" mt-2 py-2 max-w-[200px] text-[#1C2434] border-gray-600 !outline-none " />
                                      </Form.Item>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor=""
                                        className="text-[#1C2434] font-medium text-sm"
                                      >
                                        Số lượng :
                                      </label>
                                      <Form.Item
                                        {...restSizeField}
                                        name={[sizeName, "stock_attribute"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Số lượng là bắt buộc!"
                                          },
                                          {
                                            type: "number",
                                            min: 0,
                                            message:
                                              "Số lượng phải là số dương!",
                                            transform(value) {
                                              return Number(value);
                                            }
                                          }
                                        ]}
                                      >
                                        <Input className="w-[183px]  mt-2 py-2 max-w-[200px] border-gray-600 !outline-none " />
                                      </Form.Item>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor=""
                                        className="font-medium text-sm"
                                      >
                                        Giá :
                                      </label>{" "}
                                      <br />
                                      <Form.Item
                                        {...restSizeField}
                                        name={[sizeName, "price_attribute"]}
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Giá sản phẩm bắt buộc nhập!"
                                          },
                                          {
                                            type: "number",
                                            min: 0,
                                            message:
                                              "Giá sản phẩm phải là số dương!",
                                            transform(value) {
                                              return Number(value);
                                            }
                                          }
                                        ]}
                                      >
                                        <InputNumber className="w-[183px]  mt-2 py-1 max-w-[200px] border-gray-600 !outline-none " />
                                      </Form.Item>
                                    </div>


                                    <DeleteOutlined onClick={() => removeSize(sizeName)} style={{ fontSize: '20px' }} />

                                  </div>
                                )
                              )}
                              <div className="flex items-center gap-4 mb-4">
                                <Button
                                  type="primary"
                                  onClick={() => addSize()}
                                  style={{ padding: '20px 10px' }}
                                >
                                  Thêm kích cỡ
                                </Button>
                                <Button
                                  onClick={() => remove(name)}
                                  style={{ padding: '20px 10px' }}
                                  className=" bg-red-600 text-gray-100 hover:!text-gray-100 border-none hover:!bg-red-700 hover"
                                >
                                  Xóa thuộc tính
                                </Button>
                              </div>
                            </>
                          )}
                        </Form.List>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        style={{ padding: '20px 10px' }}
                        type="primary"
                        onClick={() => add()}
                      >
                        Thêm thuộc tính
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
            <Form.Item<FieldType> name="tag_product">
              <label htmlFor="" className="text-[#171821] font-medium text-sm">
                Tags sản phẩm
              </label>
              <div>
                <Select
                  mode="tags"
                  notFoundContent="Không tìm thấy tags"
                  allowClear
                  className=" mt-2 *:py-2 max-w-[200px] * border-gray-600 !outline-none "
                />
              </div>
            </Form.Item>
            <Form.Item<FieldType>
              name="featured_product"
              valuePropName="checked"
            >
              <Checkbox className="text-[#1C2434]">Sản phẩm nổi bật</Checkbox>
            </Form.Item>
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <label
                  htmlFor=""
                  className=" text-[#1C2434] font-medium text-sm"
                >
                  Ảnh sản phẩm
                </label>
                <Form.Item<FieldType>
                  name="image_product"
                  initialValue={{
                    ...data_one_item?.data?.product?.image_product
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Ảnh sản phẩm là bắt buộc!"
                    }
                  ]}
                >
                  <Upload
                    fileList={image_item}
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                    className="mt-2"
                    maxCount={1}
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
              <div>
                <label
                  htmlFor=""
                  className=" text-[#1C2434] font-medium text-sm"
                >
                  Bộ sưu tập
                </label>
                <Form.Item<FieldType>
                  name="gallery_product"
                  rules={[
                    {
                      required: true,
                      message: "Bộ sưu tập sản phẩm là bắt buộc!"
                    }
                  ]}
                >
                  <Upload
                    fileList={gallery_item}
                    listType="picture-card"
                    beforeUpload={() => false}
                    onChange={handleGalleryChange}
                    multiple={true}
                    className="mt-2"
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
            </div>
          </div>
        </div>
        {isError && (
          <span className="text-red-500">
            Lỗi! Vui lòng kiểm tra và thử lại!
          </span>
        )}
        <Form.Item>
          {mode ? (
            <Button
              style={{ padding: '20px 10px' }}
              type="primary"
              htmlType="submit"
            >
              {isPending || loading ? "Loading" : "Cập nhật sản phẩm"}
            </Button>
          ) : (
            <Button style={{ padding: '20px 10px' }}
              type="primary" htmlType="submit">
              {isPending || loading ? "Loading" : "Tạo sản phẩm"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form_Item;
