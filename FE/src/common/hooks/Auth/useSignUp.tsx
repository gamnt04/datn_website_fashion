import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpSchema } from "../../validations/auth/SignUp";
import Joi from "joi";
import { useState } from "react";

interface SignUpFormData {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

const useSignUp = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (name: string, value: string) => {
    const fieldSchema = Joi.object({ [name]: signUpSchema.extract(name) });
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

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const { data } = await instance.post(`auth/signup`, formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error("Đăng ký thất bại!");
      return error;
    },
  });

  const onSubmit = (formData: SignUpFormData) => {
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

export default useSignUp;
