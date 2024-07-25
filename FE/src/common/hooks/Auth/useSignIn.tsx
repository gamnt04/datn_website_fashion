import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Joi from "joi";
import { signInSchema } from "../../validations/auth/SignIn";
import { useState } from "react";
const useSignIn = (userId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (name: string, value: string) => {
    const fieldSchema = Joi.object({ [name]: signInSchema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    if (error) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.details[0].message,
      }));
    } else {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await instance.post(`auth/signin`, formData);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    },
    onSuccess: () => {
      toast.success("Đăng nhập thành công!", { autoClose: 500 });
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["AUTH_KEY", userId],
      });
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Sai thông tin đăng nhập. Vui lòng đăng nhập lại!");
        } else {
          toast.error("Đăng nhập thất bại!");
        }
      } else {
        toast.error("Đã xảy ra lỗi kết nối.");
      }
    },
  });

  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
  };

  return {
    onSubmit,
    formErrors,
    setFormErrors,
    validateForm,
    isPending,
    isError,
    error,
  };
};

export default useSignIn;
