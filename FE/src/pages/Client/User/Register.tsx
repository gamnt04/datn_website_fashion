import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "../../../common/hooks/Auth/useSignUp";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpSchema } from "../../../common/validations/auth/SignUp";
import { Button } from "antd";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const { onSubmit }: any = useSignUp();
  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg mt-5">
      <div className="flex justify-center w-full h-full my-auto lg:justify-normal draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full h-full p-6 text-center bg-white shadow-lg rounded-3xl border"
            >
              <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                Sign Up
              </h3>
              <p className="mb-4 text-gray-600">
                {" "}
                Enter your email and password{" "}
              </p>
              <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-2xl hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google Logo"
                />
                Sign up with Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="flex-grow border-gray-300" />
                <p className="mx-4 text-gray-600">or</p>
                <hr className="flex-grow border-gray-300" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="userName"
                  className="mb-2 text-sm font-semibold text-gray-900 flex "
                >
                  UserName
                </label>
                <input
                  id="userName"
                  type="text"
                  placeholder="UserName"
                  {...register("userName", {
                    required: true,
                    minLength: 3,
                    maxLength: 30
                  })}
                  className="flex items-center w-full px-5 py-4 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
                />
                {errors.userName && (
                  <p className="text-start mt-4 text-red-400">
                    {errors.userName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="mb-2 text-sm font-semibold text-gray-900 flex"
                >
                  {" "}
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
                />
                {errors.email && (
                  <p className="text-start mt-4 text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="mb-2 text-sm font-semibold text-gray-900 flex"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 30
                  })}
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4  text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
                />
                {errors.password && (
                  <p className="text-start mt-4 text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 text-sm font-semibold text-gray-900 flex"
                >
                  Confirm Password*
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4  text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
                />
                {errors.confirmPassword && (
                  <p className="text-start mt-4 text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-row justify-between mb-8 mt-4">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-white border-2 border-gray-500 rounded-sm peer-checked:bg-[#f68e56]">
                    <img
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                      alt="tick"
                    />
                  </div>
                  <span className="ml-3 text-sm font-normal text-gray-600">
                    I agree to the terms and conditions
                  </span>
                </label>
                {/* <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forget password?
                </a> */}
              </div>
              <Button type="primary" htmlType="submit" className="w-[100px] h-[50px]">
                Đăng Kí
              </Button>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <hr className="my-10" />
    </div>
  );
};

export default Register;
=======
import { Link } from "react-router-dom";
import useSignUp from "../../../common/hooks/Auth/useSignUp";
import { Button, Form, FormProps, Input } from "antd";
import { signUpSchema } from "../../../common/validations/auth/SignUp";

const Register = () => {
  const {
    onSubmit,
    formErrors,
    setFormErrors,
    validateForm,
    isPending,
    isError,
    error,
  } = useSignUp();

  type FieldType = {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { error } = signUpSchema.validate(values, {
      abortEarly: false,
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
      onSubmit(values);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    alert("Đăng ký thất bại");
  };

  if (isPending) return <div>Pending...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg mt-5">
      <div className="flex justify-center w-full h-full my-auto lg:justify-normal draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-7">
            <div className="flex flex-col w-full h-full p-6 text-center bg-white shadow-lg rounded-3xl border">
              <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                Đăng ký
              </h3>
              <p className="mb-4 text-gray-600">Nhập thông tin của bạn</p>
              <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-2xl hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google Logo"
                />
                Đăng ký với Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="flex-grow border-gray-300" />
                <p className="mx-4 text-gray-600">Hoặc</p>
                <hr className="flex-grow border-gray-300" />
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="space-y-4"
              >
                <Form.Item<FieldType>
                  label="userName"
                  name="userName"
                  validateStatus={formErrors.userName ? "error" : ""}
                  help={formErrors.userName}
                  className="w-[400px]"
                >
                  <Input
                    className="h-[50px]"
                    onChange={(e) => validateForm("userName", e.target.value)}
                  />
                </Form.Item>

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

                <Form.Item<FieldType>
                  label="ConfirmPassword"
                  name="confirmPassword"
                  validateStatus={formErrors.confirmPassword ? "error" : ""}
                  help={formErrors.confirmPassword}
                >
                  <Input.Password
                    className="h-[50px]"
                    onChange={(e) =>
                      validateForm("confirmPassword", e.target.value)
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-[100px] h-[50px]"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>

                <p className="text-sm text-gray-600">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Đăng nhập
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

export default Register;
