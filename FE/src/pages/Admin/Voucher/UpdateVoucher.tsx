import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
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
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Quản lý người dùng đã chọn
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

  // Generate random code for voucher
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
      setSelectedUsers(voucher.data.voucher.allowedUsers || []); // Set người dùng đã chọn
    }
  }, [voucher, form]);

  // Cập nhật người dùng đã chọn khi có thay đổi trong Select
  const handleSelectChange = (value: string[]) => {
    if (value.includes("all")) {
      // Nếu chọn "Chọn tất cả", cập nhật với tất cả người dùng
      const allUserIds = auth?.data.map((user: any) => user._id);
      setSelectedUsers(allUserIds);
      form.setFieldsValue({ allowedUsers: allUserIds });
    } else {
      // Cập nhật lựa chọn người dùng
      setSelectedUsers(value);
      form.setFieldsValue({ allowedUsers: value });
    }
  };

  // Bỏ chọn tất cả người dùng
  const handleDeselectAll = () => {
    setSelectedUsers([]); // Xóa tất cả người dùng
    form.setFieldsValue({ allowedUsers: [] });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-20">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900 ml-16 ">
          Cập nhật Voucher
        </h2>
        <div className=" ml-10 p-6 ">
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
              <div className="w-full md:w-1/2 px-4">
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
                  <Input className="h-10" />
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
                  <Select className="h-10">
                    <Select.Option value="percentage">
                      Percentage (%)
                    </Select.Option>
                    <Select.Option value="fixed">Fixed (VND)</Select.Option>
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
                  ]}
                >
                  <InputNumber className="w-full h-10" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Ngày bắt đầu mã giảm giá"
                  name="startDate"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày bắt đầu!" },
                  ]}
                >
                  <DatePicker showTime className="w-full h-10" />
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
              <div className="w-full md:w-1/2 px-4">
                <Form.Item
                  label="Mã giảm giá"
                  name="code_voucher"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã giảm giá!" },
                  ]}
                >
                  <Input
                    addonAfter={
                      <Button
                        onClick={generateRandomCode}
                        className="flex items-center justify-center h-full w-12"
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
                    className="h-10"
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
                  ]}
                >
                  <InputNumber className="w-full h-10" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Số lượng mã giảm giá"
                  name="quantity_voucher"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng!" },
                  ]}
                >
                  <InputNumber className="w-full h-10" />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Ngày kết thúc mã giảm giá"
                  name="expirationDate"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày kết thúc!" },
                  ]}
                >
                  <DatePicker showTime className="w-full h-10" />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Người sử dụng mã giảm giá"
                  name="allowedUsers"
                >
                  <div className="flex items-center">
                    <Select
                      mode="multiple"
                      style={{
                        width: "90%",
                        minHeight: "40px", // Set a fixed height to maintain the arrow icon's position
                      }}
                      placeholder="Người dùng"
                      className="mt-2"
                      options={[
                        { value: "all", label: "Chọn tất cả người dùng" },
                        ...auth?.data.map((user: any) => ({
                          value: user._id,
                          label: user.userName,
                        })),
                      ]}
                      onChange={handleSelectChange}
                      value={selectedUsers}
                      dropdownStyle={{ maxHeight: 250, overflowY: "auto" }} // Limit dropdown height
                      maxTagCount={4} // Shows up to 5 selected users
                      maxTagPlaceholder={(omittedValues) =>
                        `+${omittedValues.length} người khác`
                      }
                      allowClear
                    />
                    <Button
                      onClick={handleDeselectAll}
                      className=" absolute left-[390px] top-2 ml-2 h-8 border-red-400 text-red-400"
                    >
                      X
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </div>

            {/* Submit Button */}
            <Form.Item className="h-20">
              <Button
                type="primary"
                htmlType="submit"
                className="w-1/2 h-10 text-xl"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateVoucher;
