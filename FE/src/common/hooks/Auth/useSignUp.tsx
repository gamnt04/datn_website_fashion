import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho formData
interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const { data } = await instance.post(`auth/signup`, formData);
      return data;
    },
    onSuccess: () => {
      alert("Đăng ký thành công");
      // toast({
      //     title: "Đăng ký thành công",
      //     variant: "success"
      // })
    },
    onError: (error) => console.log(error) // Thêm xử lý lỗi
  });

  const onSubmit = (formData: SignUpFormData) => {
    mutate(formData);
    navigate("/login");
  };

  return { onSubmit };
};

export default useSignUp;
