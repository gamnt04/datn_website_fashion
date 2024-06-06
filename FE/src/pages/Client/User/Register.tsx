<<<<<<< HEAD:FE/src/pages/Client/(Auth)/[Register].tsx
import { Link } from "react-router-dom";
=======
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
>>>>>>> e317833b165177d6b46b4e78a9aa5a6b0683810c:FE/src/pages/Client/User/Register.tsx

const Register = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: errors } = useForm({
    defaultValues: {
      email: '',
      password: '',

      confirmPassword: ''
    }
  })
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      // console.log(formData);
      const { data } = await axios.post('http://localhost:2004/api/v1/auth/signup', formData);
      return data
    },
    onSuccess: () => {
      toast.success("Đăng nhập ký thành công!", { autoClose: 800 });
    },
    onError: (error) => console.log(error)
  })
  const onSubmit = (formData: any) => {
    mutate(formData);
    navigate('/login')
  }
  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg">
      <div className="flex justify-center w-full h-full my-auto lg:justify-normal draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center xl:p-7">
            <form className="flex flex-col w-full h-full p-6 text-center bg-white shadow-lg rounded-3xl" onSubmit={handleSubmit(onSubmit)}>
              <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                Sign Up
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
                Sign up with Google
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
                id="email"
                type="email"
                {...register('email', { required: true })}
                placeholder="mail@loopple.com"
                className="flex items-center w-full px-5 py-4 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none mb-7 focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
              />
              <label
                htmlFor="password"
                className="mb-2 text-sm font-semibold text-gray-900 text-start"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { required: true })}
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
              />

              <label
                htmlFor="password"
                className="mb-2 text-sm font-semibold text-gray-900 text-start"
              >
                Confirm Password*
              </label>
              <input
                id="password"
                type="password"
                {...register('confirmPassword', { required: true })}
                placeholder="Enter a password"
                className="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-2xl focus:ring-2 focus:ring-gray-200"
              />
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
              <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 bg-gray-900 rounded-2xl hover:bg-[#f68e56] focus:ring-4 focus:ring-[#f68e56] md:w-96">
                Create Account
              </button>
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
