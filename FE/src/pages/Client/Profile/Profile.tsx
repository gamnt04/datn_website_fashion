import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";

const Profile = () => {
  type FieldType = {
    userName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
  };
  const queryClient = useQueryClient();
  const [messageApi, contexHolder] = message.useMessage();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [initialValues, setInitialValues] = useState<FieldType>({});
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await instance.get(`/auth/${userId}`);
      if (data.birthDate) {
        data.birthDate = dayjs(data.birthDate).format("YYYY-MM-DD"); // Chuyển đổi ngày tháng thành định dạng YYYY-MM-DD
      }
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (newUser) => {
      const { data } = await instance.put(`/auth/${userId}`, newUser);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      messageApi.open({
        type: "success",
        content: "Cập nhật thông tin thành công",
      });
    },
  });
  const handleValuesChange = (changedValues: FieldType) => {
    // Kiểm tra sự thay đổi
    setIsChanged(
      JSON.stringify(changedValues) !== JSON.stringify(initialValues)
    );
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values.birthDate) {
      values.birthDate = dayjs(values.birthDate).format("YYYY-MM-DD"); // Chuyển đổi ngày tháng thành định dạng YYYY-MM-DD trước khi gửi đi
    }
    mutate(values);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isPending) return <div>Pending...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      {contexHolder}
      <div>
        <div className="border-b-2">
          <h2 className="text-xl">Hồ Sơ Của Tôi</h2>
          <p className="py-2 text-sm">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="py-8">
          <div className="flex flex-row flex-wrap lg:flex-nowrap text-sm">
            <div className="basis-full order-2 lg:order-1 lg:basis-2/3">
              <Form
                name="basic"
                onValuesChange={handleValuesChange}
                initialValues={
                  data
                    ? {
                        ...data,
                        birthDate: data.birthDate
                          ? dayjs(data.birthDate)
                          : null, // Chuyển đổi ngày tháng từ định dạng YYYY-MM-DD
                      }
                    : {}
                }
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item name="userName" label="Tên đăng nhập" rules={[]}>
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Họ và tên" name="fullName">
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Email" name="email">
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Ngày sinh"
                  name="birthDate"
                  rules={[]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={data?.birthDate ? dayjs(data.birthDate) : null}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!isChanged}
                  >
                    Lưu thay đổi
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
