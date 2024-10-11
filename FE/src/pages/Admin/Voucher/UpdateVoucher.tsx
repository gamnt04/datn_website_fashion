import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaRandom } from "react-icons/fa";

type FieldType = {
  name_voucher: string;
  code_voucher: string;
  description_voucher: string;
  quantity_voucher: number;
  discountType: string;
  discountValue: number;
  minimumSpend: number;
  maxDiscount: number;
  allowedUsers: string[];
  startDate: Date;
  expirationDate: Date;
};

const UpdateVoucher = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [userType, setUserType] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data: voucher, isLoading } = useQuery({
    queryKey: ["voucher", id],
    queryFn: () => instance.get(`/voucher/${id}`),
  });

  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
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
      queryClient.invalidateQueries({
        queryKey: ["voucher"],
      });

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

  const { data: auth } = useQuery({
    queryKey: ["auths"],
    queryFn: () => instance.get(`/auths`),
  });
  const { data: shippersData } = useQuery({
    queryKey: ["shippers"],
    queryFn: () => instance.get(`/shippers`),
  });

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 8; i++) {
      randomCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    form.setFieldsValue({ code_voucher: randomCode });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };

  useEffect(() => {
    if (voucher?.data?.voucher) {
      form.setFieldsValue({
        ...voucher.data.voucher,
        startDate: moment(voucher.data.voucher.startDate),
        expirationDate: moment(voucher.data.voucher.expirationDate),
      });

      const allowedUsers = voucher.data.voucher.allowedUsers || [];
      const isUser = allowedUsers.every((id: string) =>
        auth?.data?.some((user: any) => user._id === id)
      );
      const isShipper = allowedUsers.every((id: string) =>
        shippersData?.data?.some((shipper: any) => shipper._id === id)
      );

      if (isUser) {
        setUserType(["user"]);
      } else if (isShipper) {
        setUserType(["courier"]);
      } else {
        setUserType(["user", "courier"]);
      }
      const allowedUsersWithNames = allowedUsers.map((id: string) => {
        const user = auth?.data?.find((user: any) => user._id === id);
        if (user) {
          return { value: user._id, label: user.userName || user.fullName };
        }

        const shipper = shippersData?.data?.find(
          (shipper: any) => shipper._id === id
        );
        if (shipper) {
          return {
            value: shipper._id,
            label: shipper.fullName || "Shipper không có tên",
          };
        }

        return { value: id, label: id };
      });

      setSelectedUsers(allowedUsersWithNames.map((user: any) => user.value));
      form.setFieldsValue({
        allowedUsers: allowedUsersWithNames.map((user: any) => user.label),
      });
    }
  }, [voucher, auth, shippersData, form]);

  const handleUserTypeChange = (checkedValues: string[]) => {
    setUserType(checkedValues);

    const existingUsers = auth?.data?.filter((user: any) =>
      selectedUsers.includes(user._id)
    );

    const existingShippers = shippersData?.data?.filter((shipper: any) =>
      selectedUsers.includes(shipper._id)
    );

    const updatedSelectedUsers = [
      ...(checkedValues.includes("user")
        ? existingUsers.map((user: any) => user._id)
        : []),
      ...(checkedValues.includes("courier")
        ? existingShippers.map((shipper: any) => shipper._id)
        : []),
    ];

    setSelectedUsers(updatedSelectedUsers);
    form.setFieldsValue({ allowedUsers: updatedSelectedUsers });
  };

  const handleSelectChange = (value: string[]) => {
    if (value.includes("all")) {
      const allUserIds = auth?.data?.map((user: any) => user._id);
      setSelectedUsers(allUserIds);
      form.setFieldsValue({ allowedUsers: allUserIds });
    } else {
      setSelectedUsers(value);
      form.setFieldsValue({ allowedUsers: value });
    }
  };

  const filteredData =
    userType.length === 0
      ? []
      : userType.includes("user") && userType.includes("courier")
      ? [...(auth?.data || []), ...(shippersData?.data || [])]
      : userType.includes("user")
      ? auth?.data
      : shippersData?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-20">
      <div className="pb-12 border-b border-gray-900/10">
        <h2 className="ml-16 text-2xl font-semibold leading-7 text-gray-900 ">
          Cập Nhật Mã Giảm Giá
        </h2>
        <div className="p-6 ml-10 ">
          {contextHolder}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            initialValues={voucher}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            className="max-w-full"
          >
            {/* Use flexbox to split form into 2 columns */}
            <div className="flex flex-wrap -mx-4">
              {/* Column 1 */}
              <div className="w-full px-4 md:w-1/2">
                <Form.Item<FieldType>
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
                  label="Loại mã giảm giá"
                  name="discountType"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại mã giảm giá!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="percentage">
                      Giảm giá theo phần trăm(%)
                    </Select.Option>
                    <Select.Option value="fixed">
                      Giảm giá theo số tiền cố định (VND)
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item<FieldType>
                  label="Điều kiện mã giảm giá"
                  name="minimumSpend"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập điều kiện mã giảm giá!",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Số tiền tối thiểu phải lớn hơn 0!",
                    },
                  ]}
                >
                  <InputNumber className="w-full" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Ngày bắt đầu mã giảm giá"
                  name="startDate"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày bắt đầu!" },
                    {
                      validator: (_, value) => {
                        if (!value || value.isBefore(new Date())) {
                          return Promise.reject(
                            new Error("Ngày bắt đầu không được trong quá khứ!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <DatePicker showTime className="w-full" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Ngày kết thúc mã giảm giá"
                  name="expirationDate"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày kết thúc!" },
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

                <Form.Item<FieldType>
                  label="Mô tả mã giảm giá"
                  name="description_voucher"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </div>

              {/* Column 2 */}
              <div className="w-full px-4 md:w-1/2">
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
                  <InputNumber className="w-full" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Giá trị giảm giá tối đa"
                  name="maxDiscount"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giảm giá tối đa!",
                    },
                    {
                      type: "number",
                      min: 1,
                      message: "Giảm giá tối đa phải lớn hơn 0!",
                    },
                  ]}
                >
                  <InputNumber className="w-full " />
                </Form.Item>
                <Form.Item<FieldType>
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

                <Form.Item label="Chọn loại người dùng">
                  <Checkbox.Group
                    options={[
                      { label: "Người dùng", value: "user" },
                      { label: "Shipper", value: "courier" },
                    ]}
                    value={userType}
                    onChange={handleUserTypeChange}
                  />
                </Form.Item>

                <Form.Item<FieldType> label="Người sử dụng mã giảm giá">
                  <div className="flex items-center">
                    <Select
                      mode="multiple"
                      style={{
                        width: "90%",
                        minHeight: "40px",
                      }}
                      placeholder="Chọn người dùng/shipper"
                      className="mt-2"
                      options={filteredData?.map((user: any) => ({
                        value: user._id,
                        label:
                          user.userName || user.fullName || "Tên không có sẵn",
                      }))}
                      onChange={handleSelectChange}
                      value={selectedUsers}
                      dropdownStyle={{ maxHeight: 250, overflowY: "auto" }}
                      maxTagCount={4}
                      maxTagPlaceholder={(omittedValues) =>
                        `+${omittedValues.length} người khác`
                      }
                      allowClear
                    />
                    <span className="ml-2 text-gray-600">
                      Đã chọn: {selectedUsers.length}
                    </span>
                  </div>
                </Form.Item>
              </div>
            </div>
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
