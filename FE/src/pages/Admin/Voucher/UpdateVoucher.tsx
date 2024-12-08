/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import instance from "../../../configs/axios";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRandom } from "react-icons/fa";
import { Loader } from "lucide-react";
import dayjs from "dayjs";
import { useVoucherHandlers } from "./_component/useVoucherHandlers ";
import useDataVoucher from "./_component/useDataVoucher";
import { useCategoryQuery } from "../../../common/hooks/Category/useCategoryQuery";
import { IVoucher } from "../../../common/interfaces/Voucher";
import { AiFillBackward } from "react-icons/ai";
import { Option } from "antd/es/mentions";
import { Auth } from "../../../common/interfaces/Auth";

const UpdateVoucher = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { data: categories } = useCategoryQuery();
  const { auth, products } = useDataVoucher();
  const { mutate, isLoading: loading_voucher } = useMutation({
    mutationFn: async (formData: IVoucher) => {
      try {
        return await instance.put(`/voucher/${id}`, formData);
      } catch (error) {
        throw new Error(error as any).message;
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Cập nhật mã giảm giá thành công",
      });
      form.resetFields();
      setTimeout(() => {
        nav("/admin/voucher");
      }, 1000);
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const { data: vouchers, isLoading } = useQuery({
    queryKey: ["vouchers", id],
    queryFn: () => instance.get(`/voucher/${id}`),
  });
  const {
    selectedUsers,
    applyType,
    limitType,
    discountType,
    selectedItems,
    selectedCategories,
    setSelectedCategories,
    selectAll,
    setLimitType,
    setdiscountType,
    setApplyType,
    setSelectedItems,
    generateRandomCode,
    setSearchText,
    onApplyTypeChange,
    ondiscountTypeChange,
    handleCheckboxChange,
    handleSelect,
    handleSelectAll,
    filteredProducts,
    handleCheckboxChangeCate,
    filteredCategorys,
    handleSelectAllCate,
    handleSelectCate,
    handleSelectAllAuth,
    handleSelectAuth,
    handleCheckboxChangeAuth,
    selectedAuths,
    setSelectedAuths,
    filteredAuths,
  } = useVoucherHandlers({
    form,
    products,
    categories,
    auth,
  });

  const onFinish: FormProps<IVoucher>["onFinish"] = (values) => {
    if (applyType !== "product") {
      values.appliedProducts = []; // Đặt giá trị trống nếu không áp dụng cho sản phẩm
    }

    const formData = {
      ...values,
      allowedUsers: selectedUsers,
      appliedProducts: selectedItems,
      appliedCategories: selectedCategories,
    };
    console.log(`formData`, formData);
    mutate(formData);
  };

  useEffect(() => {
    if (vouchers?.data?.voucher) {
      const voucherData = vouchers.data.voucher;

      // Set form values
      form.setFieldsValue({
        ...voucherData,
        startDate: voucherData.startDate ? dayjs(voucherData.startDate) : null,
        expirationDate: voucherData.expirationDate
          ? dayjs(voucherData.expirationDate)
          : null,
      });

      // Đảm bảo hiển thị ô input khi appliedProducts rỗng
      if (voucherData.applyType === "product") {
        setApplyType("product");
        setSelectedItems(voucherData.appliedProducts || []);
      } else if (voucherData.applyType === "category") {
        setApplyType("category");
        setSelectedCategories(voucherData.appliedCategories || []);
      } else {
        setApplyType("total");
      }

      // Set limit type checkboxes
      const limitTypes = [];
      if (voucherData.startDate && voucherData.expirationDate) {
        limitTypes.push("time");
      }
      if (voucherData.quantity_voucher) {
        limitTypes.push("quantity");
      }
      setLimitType(limitTypes);
      setSelectedAuths(voucherData.allowedUsers || []);
      setdiscountType(voucherData.discountType);
    }
  }, [vouchers?.data?.voucher]);

  if (isLoading || loading_voucher) return <Loader />;

  return (
    <div className="mt-20">
      <div className="pb-12 border-b border-gray-900/10">
        {isLoading && (
          <div className="fixed z-[10] bg-[#17182177] w-screen h-screen top-0 right-0 grid place-items-center">
            <div className="animate-spin">
              <Loader />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mx-16 mt-20 mb-5 ">
          <h1 className="text-[26px] font-semibold">Cập Nhật Mã Giảm Giá</h1>
          <Link to="/admin/voucher">
            <Button type="primary">
              <AiFillBackward /> Quay lại
            </Button>
          </Link>
        </div>
        <div className="p-6 ml-10 ">
          {contextHolder}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            className="max-w-full"
          >
            {/* Sử dụng flexbox để chia form thành 2 cột */}
            <div className="flex flex-wrap -mx-4">
              {/* Cột 1 */}
              <div className="w-full px-4 md:w-1/2">
                <Form.Item<IVoucher>
                  label="Tên mã giảm giá"
                  name="name_voucher"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên mã giảm giá!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Mã giảm giá"
                  name="code_voucher"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã giảm giá!" },
                    { min: 6, message: "Mã giảm giá phải lớn hơn 5 ký tự!" },
                    {
                      pattern: /^[A-Z0-9]+$/,
                      message: "Mã giảm giá chỉ được chứa chữ in hoa và số!",
                    },
                  ]}
                >
                  <Input
                    addonAfter={
                      <Button
                        onClick={generateRandomCode}
                        className="flex items-center justify-center w-12 h-full"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <FaRandom
                          style={{
                            transform: "rotate(180deg)",
                            fontSize: "16px",
                          }}
                        />{" "}
                      </Button>
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Loại mã giảm giá"
                  name="discountType"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại mã giảm giá!",
                    },
                  ]}
                >
                  <Select
                    value={discountType}
                    onChange={ondiscountTypeChange}
                    placeholder="Chọn loại mã giảm giá"
                  >
                    <Select.Option value="percentage">
                      Giảm giá theo phần trăm (%)
                    </Select.Option>
                    <Select.Option value="fixed">
                      Giảm giá theo số tiền cố định (VND)
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Giá trị mã giảm giá"
                  name="discountValue"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị mã giảm giá!",
                    },
                    {
                      validator: (_, value) => {
                        const discountType = form.getFieldValue("discountType");
                        if (discountType === "fixed") {
                          if (value && value > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Giá trị tiền phải lớn hơn 0!")
                          );
                        } else if (discountType === "percentage") {
                          if (value && value >= 0 && value <= 100) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Giá trị phần trăm phải từ 0 đến 100!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber className="w-full " />
                </Form.Item>

                {discountType === "percentage" && (
                  <Form.Item<IVoucher>
                    label="Giá trị giảm giá tối đa"
                    name="maxDiscount"
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        message: "Giảm giá tối đa phải lớn hơn hoặc bằng 0!",
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter={
                        <div
                          className="flex items-center justify-center w-12 h-full"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          VND
                        </div>
                      }
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  label="Áp dụng giảm giá cho"
                  name="applyType"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại áp dụng!",
                    },
                  ]}
                >
                  <Select
                    value={applyType}
                    onChange={onApplyTypeChange}
                    placeholder="Chọn loại áp dụng"
                  >
                    <Select.Option value="product">Sản phẩm</Select.Option>
                    <Select.Option value="category">
                      Danh mục sản phẩm
                    </Select.Option>
                    <Select.Option value="total">
                      Tổng giá trị đơn hàng
                    </Select.Option>
                  </Select>
                </Form.Item>

                {/* Hiển thị ô cho sản phẩm nếu chọn "product" */}
                {applyType === "product" && (
                  <Form.Item label="Sản phẩm áp dụng" name="appliedProducts">
                    <Select
                      mode="multiple"
                      placeholder="Chọn sản phẩm áp dụng"
                      value={[]}
                      tagRender={(): any => null}
                      onChange={handleSelect}
                      style={{ width: "100%" }}
                      suffixIcon={
                        <p className="text-black">
                          Đã chọn: {selectedItems.length}
                        </p>
                      }
                      dropdownRender={(menu) => (
                        <div className="max-h-[500px] overflow-y-auto">
                          {/* Thêm ô tìm kiếm */}
                          <div style={{ padding: "8px 12px" }}>
                            <Input.Search
                              placeholder="Tìm kiếm sản phẩm..."
                              onChange={(e) => setSearchText(e.target.value)}
                              style={{ marginBottom: 8 }}
                            />
                          </div>
                          <div
                            style={{
                              padding: "8px 12px",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            <Checkbox
                              checked={selectAll}
                              onChange={(e) =>
                                handleSelectAll(e.target.checked)
                              }
                            >
                              Chọn tất cả
                            </Checkbox>
                          </div>
                          <div className="py-4 pl-6">
                            {filteredProducts.map((product, index) => (
                              <div key={product._id}>
                                <Checkbox
                                  value={product._id}
                                  checked={selectedItems.includes(product._id)}
                                  onChange={() =>
                                    handleCheckboxChange(product._id)
                                  }
                                >
                                  {product.name_product}
                                </Checkbox>
                                {index < filteredProducts.length - 1 && (
                                  <div className="h-px my-2 bg-gray-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    >
                      {selectedItems.map((id) => (
                        <Option key={id} value={id}>
                          {products.find((p: any) => p._id === id)?.name_product}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}

                {applyType === "category" && (
                  <Form.Item
                    label="Danh mục sản phẩm áp dụng"
                    name="appliedCategories"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Chọn danh mục sản phẩm áp dụng"
                      value={[]}
                      tagRender={(): any => null}
                      onChange={handleSelectCate}
                      style={{ width: "100%" }}
                      suffixIcon={
                        <p className="text-black">
                          Đã chọn: {selectedCategories.length}
                        </p>
                      }
                      showSearch={false}
                      dropdownRender={(menu) => (
                        <div className="max-h-[500px] overflow-y-auto">
                          {/* Thêm ô tìm kiếm */}
                          <div style={{ padding: "8px 12px" }}>
                            <Input.Search
                              placeholder="Tìm kiếm danh mục..."
                              onChange={(e) => setSearchText(e.target.value)}
                              style={{ marginBottom: 8 }}
                            />
                          </div>
                          <div
                            style={{
                              padding: "8px 12px",
                              borderBottom: "1px solid #f0f0f0",
                            }}
                          >
                            <Checkbox
                              checked={selectAll}
                              onChange={(e) =>
                                handleSelectAllCate(e.target.checked)
                              }
                            >
                              Chọn tất cả
                            </Checkbox>
                          </div>
                          <div className="py-4 pl-6">
                            {filteredCategorys.map((category, index) => (
                              <div key={category._id}>
                                <Checkbox
                                  value={category._id}
                                  checked={selectedCategories.includes(
                                    category._id
                                  )}
                                  onChange={() =>
                                    handleCheckboxChangeCate(category._id)
                                  }
                                >
                                  {category.name_category}
                                </Checkbox>
                                {index < filteredCategorys.length - 1 && (
                                  <div className="h-px my-2 bg-gray-300"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    ></Select>
                  </Form.Item>
                )}

                <Form.Item
                  label="Số tiền đơn hàng tối thiểu"
                  name="minimumSpend"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số tiền tối thiểu!",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Số tiền tối thiểu phải lớn hơn hoặc bằng 0!",
                    },
                    {
                      validator: (_, value) => {
                        const discountValue =
                          form.getFieldValue("discountValue");
                        const maxDiscount = form.getFieldValue("maxDiscount");

                        // Kiểm tra nếu minimumSpend <= discountValue
                        if (value && discountValue && value <= discountValue) {
                          return Promise.reject(
                            new Error(
                              "Số tiền tối thiểu phải lớn hơn giá trị giảm giá!"
                            )
                          );
                        }

                        // Kiểm tra nếu minimumSpend <= maxDiscount
                        if (value && maxDiscount && value <= maxDiscount) {
                          return Promise.reject(
                            new Error(
                              "Số tiền tối thiểu phải lớn hơn giá trị giảm giá tối đa!"
                            )
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber
                    addonAfter={
                      <div
                        className="flex items-center justify-center w-12 h-full"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        VND
                      </div>
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>

              {/* Cột 2 */}
              <div className="w-full px-4 md:w-1/2">
                <Form.Item<IVoucher>
                  label="Mô tả mã giảm giá"
                  name="description_voucher"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <div>
                  <Form.Item<IVoucher>
                    label="Ngày bắt đầu"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập ngày bắt đầu!",
                      },
                      {
                        validator: (_, value) => {
                          if (!value || value.isBefore(new Date())) {
                            return Promise.reject(
                              new Error(
                                "Ngày bắt đầu không được trong quá khứ!"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker showTime className="w-full " />
                  </Form.Item>

                  <Form.Item<IVoucher>
                    label="Ngày kết thúc"
                    name="expirationDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập ngày kết thúc!",
                      },
                      {
                        validator: (_, value) => {
                          const startDate = form.getFieldValue("startDate");
                          if (startDate && value && value.isBefore(startDate)) {
                            return Promise.reject(
                              new Error(
                                "Ngày kết thúc phải lớn hơn ngày bắt đầu!"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker showTime className="w-full " />
                  </Form.Item>
                </div>

                <Form.Item<IVoucher>
                  label="Số lượng mã giảm giá"
                  name="quantity_voucher"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng!" },
                    {
                      type: "number",
                      min: 1,
                      message: "Số lượng phải lớn hơn 0!",
                    },
                  ]}
                >
                  <InputNumber className="w-full " />
                </Form.Item>

                <Form.Item
                  label="Người sử dụng mã giảm giá"
                  name="allowedUsers"
                >
                  <Select
                    mode="multiple"
                    placeholder="Chọn người người sử dụng mã giảm giá"
                    value={[]}
                    tagRender={(): any => null}
                    onChange={handleSelectAuth}
                    style={{ width: "100%" }}
                    suffixIcon={
                      <p className="text-black">
                        Đã chọn: {selectedAuths.length}
                      </p>
                    }
                    showSearch={false}
                    dropdownRender={(menu: any) => (
                      <div className="max-h-[500px] overflow-y-auto">
                        {/* Thêm ô tìm kiếm */}
                        <div style={{ padding: "8px 12px" }}>
                          <Input.Search
                            placeholder="Tìm kiếm người sử dụng..."
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ marginBottom: 8 }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "8px 12px",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                        >
                          <Checkbox
                            checked={selectAll}
                            onChange={(e) =>
                              handleSelectAllAuth(e.target.checked)
                            }
                          >
                            Chọn tất cả
                          </Checkbox>
                        </div>
                        <div className="py-4 pl-6">
                          {filteredAuths?.map((user: Auth, index: any) => (
                            <div key={user._id}>
                              <Checkbox
                                value={user._id}
                                checked={selectedAuths.includes(user._id)}
                                onChange={() =>
                                  handleCheckboxChangeAuth(user._id)
                                }
                              >
                                {user.userName}
                              </Checkbox>
                              {index < filteredAuths.length - 1 && (
                                <div className="h-px my-2 bg-gray-300"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  ></Select>
                </Form.Item>
              </div>
            </div>

            {/* Nút gửi */}
            <Form.Item className="h-20">
              <Button type="primary" htmlType="submit" className="text-xl ">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVoucher;
