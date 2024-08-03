import React from "react";
import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import ProfileHook from "../../../common/hooks/Settings/ProfileHook";

export type FieldType = {
  userName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  avatar?: string;
};

const Profile = () => {
  const {
    contextHolder,
    isChanged,
    isSaving,
    fileInputRef,
    isLoading,
    isPending,
    isError,
    error,
    avatarUrl,
    handleValuesChange,
    handleFileChange,
    mutate,
    data,
  } = ProfileHook();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values.birthDate) {
      values.birthDate = dayjs(values.birthDate).format("YYYY-MM-DD");
    }
    if (avatarUrl) {
      values.avatar = avatarUrl; // Thêm URL của ảnh vào dữ liệu người dùng
    }
    mutate(values);
  };

  const handleChooseFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isPending) return <div>Pending...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      {contextHolder}

      <div>
        <div className="border-b-2 mt-[18px]">
          <h2 className="text-xl">Hồ Sơ Của Tôi</h2>
          <p className="py-2 text-sm">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="py-8">
          <Form
            name="basic"
            onValuesChange={handleValuesChange}
            initialValues={
              data
                ? {
                    ...data,
                    birthDate: data.birthDate ? dayjs(data.birthDate) : null,
                  }
                : {}
            }
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
          >
            <div className="flex flex-row flex-wrap lg:flex-nowrap text-sm">
              <div className="basis-full order-2 lg:order-1 lg:basis-2/3">
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
                    className="bg-[#000000] text-[#ffffff] h-[50px]"
                    htmlType="submit"
                    disabled={!isChanged || isSaving} // Disable nút khi chưa thay đổi hoặc đang lưu
                  >
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </Form.Item>
              </div>
              <div className="order-1 border-b p-3 my-4 basis-full lg:order-2 lg:border-b-0 lg:border-l-2 lg:basis-1/3">
                <Form.Item<FieldType>
                  name="avatar"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 25 }}
                >
                  <div className="space-y-8">
                    <div className="flex justify-center mb-4">
                      <img
                        src={avatarUrl || data?.avatar || ""}
                        className="w-44 h-44 rounded-full"
                        alt="Avatar"
                      />
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-center">
                        <button
                          className=" bg-black text-white w-[100px] h-[40px]"
                          onClick={handleChooseFile}
                        >
                          Chọn ảnh
                        </button>
                        <input
                          type="file"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          id="fileInput"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Profile;
