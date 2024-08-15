import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      // Assume you have an endpoint for requesting password reset
      await axios.post("http://localhost:2004/api/v1/forgot-password", { email: values.email });
      message.success("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu!");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Chuyển hướng sau 2 giây
    } catch (error) {
      message.error("Không tìm thấy email của bạn!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg mt-5">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      )}
      <div className="flex justify-center w-full h-full my-auto lg:justify-normal draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-7">
            <div className="flex flex-col w-full h-full p-6 text-center bg-white shadow-lg rounded-3xl border">
              <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                Quên mật khẩu
              </h3>
              <p className="mb-4 text-gray-600">
                Nhập email của bạn để đặt lại mật khẩu
              </p>
              <Form
                name="forgot-password"
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email của bạn!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input className="h-[50px]" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-[150px] h-[50px]"
                    disabled={loading}
                  >
                    Gửi yêu cầu
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-10" />
    </div>
  );
};

export default ForgotPassword;