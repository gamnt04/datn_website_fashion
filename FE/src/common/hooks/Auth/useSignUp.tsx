import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast.success("Đăng ký thành công!");
    },
    onError: (error) => {
      toast.error("Đăng ký thất bại!");
      return error;
    } // Thêm xử lý lỗi
  });

  const onSubmit = (formData: SignUpFormData) => {
    mutate(formData);
    navigate("/login");
  };

  return { onSubmit };
};

export default useSignUp;
