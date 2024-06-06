<<<<<<< HEAD:FE/src/pages/Client/(Auth)/[Login].tsx
import { Link } from "react-router-dom";
=======
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../../common/hooks/Storage/useStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const signinSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .required(),
  password: Joi.string().min(6).required()
})
>>>>>>> e317833b165177d6b46b4e78a9aa5a6b0683810c:FE/src/pages/Client/User/Login.tsx

const Login = () => {
  const [, setUser] = useLocalStorage('user', {});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(signinSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { mutate } = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await axios.post('http://localhost:2004/api/v1/auth/signin', formData);
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Đăng nhập thành công!", { autoClose: 800 });
      setTimeout(() => navigate('/'), 1000);
    },
    onError: () => {
      toast.error("Đăng nhập thất bại!");
    }
  });

  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg">
      <div className="flex justify-center w-full h-full my-auto lg:justify-normal draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-7">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-full p-6 text-center bg-white shadow-lg rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                Sign In
              </h3>
              <p className="mb-4 text-gray-600">
                Enter your email and password
              </p>
              <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-2xl hover:bg-gray-100 focus:ring-4 focus:ring-gray-300">
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google Logo"
                />
                Sign in with Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="flex-grow border-gray-300" />
                <p className="mx-4 text-gray-600">or</p>
                <hr className="flex-grow border-gray-300" />
              </div>
              <label
                htmlFor="email"
                className="mb-2 text-sm font-semibold text-gray-900 text-start"
              >
                Email*
              </label>
              <input
                {...register('email', { required: true, minLength: 3 })}
                id="email"
                type="email"
                placeholder="mail@loopple.com"
                className="flex items-center w-full px-5 py-4 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none mb-7 focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
              />
              {errors.email && <p>{errors.email.message}</p>}
              <label
                htmlFor="password"
                className="mb-2 text-sm font-semibold text-gray-900 text-start"
              >
                Password*
              </label>
              <input
                {...register('password', { required: true, minLength: 6 })}
                id="password"
                type="password"
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
              />
              {errors.password && <p>{errors.password.message}</p>}
              <div className="flex flex-row justify-between mb-8">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 bg-white border-2 border-gray-500 rounded-sm peer-checked:bg-[#f68e56]">
                    <img
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                      alt="tick"
                    />
                  </div>
                  <span className="ml-3 text-sm font-normal text-gray-600">
                    Keep me logged in
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forget password?
                </a>
              </div>
              <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 bg-gray-900 rounded-2xl hover:bg-[#f68e56] focus:ring-4 focus:ring-[#f68e56] md:w-96">
                Sign In
              </button>
              <p className="text-sm text-gray-600">
                Not registered yet?{" "}
                <Link
                  to="/login/register"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Create an Account
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

export default Login;
