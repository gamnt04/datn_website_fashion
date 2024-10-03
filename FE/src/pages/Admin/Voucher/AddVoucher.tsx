import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const AddVoucher = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
     const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return await instance.post(`/voucher`, formData);
      } catch (error) {
        throw new Error(error as any).message;
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Thêm mới mã giảm giá thành công",
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

  const { data, isLoading } = useQuery({
    queryKey: ["auths"],
    queryFn: () => instance.get(`/auths`),
  });
  console.log(`auths`, data?.data);
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCode = "";
    for (let i = 0; i < 8; i++) {
      randomCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // Cập nhật giá trị cho input
    form.setFieldsValue({ code_voucher: randomCode });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    //console.log("Success:", values);
    mutate(values);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="mt-20 ml-10">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="Tên mã giảm giá"
          name="name_voucher"
          rules={[
            { required: true, message: "Vui lòng nhập tên mã giảm giá!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mã giảm giá"
          name="code_voucher"
          rules={[{ required: true, message: "Vui lòng nhập mã giảm giá!" }]}
        >
          <Input
            addonAfter={
              <Button type="default" onClick={generateRandomCode}>
                Random
              </Button>
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả mã giảm giá"
          name="description_voucher"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Số lượng mã giảm giá"
          name="quantity_voucher"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Loại mã giảm giá"
          name="discountType"
          rules={[
            { required: true, message: "Vui lòng chọn loại mã giảm giá!" },
          ]}
        >
          <Select>
            <Select.Option value="percentage">Percentage (%)</Select.Option>
            <Select.Option value="fixed">Fixed (VND)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Giá trị mã giảm giá"
          name="discountValue"
          rules={[
            { required: true, message: "Vui lòng nhập giá trị mã giảm giá!" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<FieldType>
          label="Điều kiện mã giảm giá"
          name="minimumSpend"
          rules={[
            { required: true, message: "Vui lòng nhập điều kiện mã giảm giá!" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<FieldType>
          label="Người sử dụng mã giảm giá"
          name="allowedUsers"
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Người dùng"
            options={data?.data.map((user: any) => ({
              value: user._id,
              label: user.userName,
            }))}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ngày bắt đầu mã giảm giá"
          name="startDate"
          rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu!" }]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item<FieldType>
          label="Ngày kết thúc mã giảm giá"
          name="expirationDate"
          rules={[{ required: true, message: "Vui lòng nhập ngày kết thúc!" }]}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVoucher;
