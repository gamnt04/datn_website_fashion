import { Link } from "react-router-dom";
import useSignIn from "../../../common/hooks/Auth/useSignIn";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { signInSchema } from "../../../common/validations/auth/SignIn";

const Login = () => {
  const {
    onSubmit,
    formErrors,
    setFormErrors,
    validateForm,
    isPending,
    isError,
    error
  } = useSignIn();
  type FieldType = {
    email?: string;
    password?: string;
  };

  if (isPending) return <div>Pending...</div>;
  if (isError) return <div>{error.message}</div>;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const email: string = values.email || ""; // Sử dụng giá trị mặc định nếu không có giá trị
    const password: string = values.password || "";
    const { error } = signInSchema.validate(values, {
      abortEarly: false
    });
    if (error) {
      const errors = error.details.reduce(
        (acc: Record<string, string>, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {}
      );
      setFormErrors(errors);
      console.log(error);
    } else {
      setFormErrors({});
      onSubmit({ email, password });
    }
  };

  // const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  //   errorInfo
  // ) => {
  //   alert("Đăng nhập thất bại");
  // };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg mt-5">
      <div className="flex justify-center w-full h-full my-auto lg:justify-normal draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-7">
            <div className="flex flex-col w-full h-full p-6 text-center bg-white shadow-lg rounded-3xl border">
              <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                Đăng nhập
              </h3>
              <p className="mb-4 text-gray-600">
                Nhập email và mật khẩu của bạn
              </p>
              <div className="flex items-center mb-3">
                {/* <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-2xl hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google Logo"
                />
                Đăng nhập với Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="flex-grow border-gray-300" />
                <p className="mx-4 text-gray-600">Hoặc</p> */}
                <hr className="flex-grow border-gray-300" />
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  validateStatus={formErrors.email ? "error" : ""}
                  help={formErrors.email}
                  className="w-[400px]"
                >
                  <Input
                    className="h-[50px]"
                    onChange={(e) => validateForm("email", e.target.value)}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  validateStatus={formErrors.password ? "error" : ""}
                  help={formErrors.password}
                >
                  <Input.Password
                    className="h-[50px]"
                    onChange={(e) => validateForm("password", e.target.value)}
                  />
                </Form.Item>
                {/* 
                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                  // wrapperCol={{ offset: 8, span: 16 }}
                >
                  <div className="flex justify-between items-center">
                    <Checkbox>Ghi nhớ</Checkbox>
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>
                </Form.Item> */}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-[100px] h-[50px]"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <p className="text-sm text-gray-600">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/login/register"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Đăng ký tài khoản
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-10" />
    </div>
  );
};

export default Login;
