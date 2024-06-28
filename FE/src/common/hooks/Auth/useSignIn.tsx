import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
// import { useToast } from 'react-toastify';

const useSignIn = () => {
  // const toast = useToast();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await instance.post(`auth/signin`, formData);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    },
    onSuccess: () => {
      alert("Đăng nhập thành công");
      // toast({
      //     title: "Đăng ký thành công",
      //     description: "You have successfully signed in.",
      //     status: "success",
      //     duration: 5000,
      //     isClosable: true,
      // });
    }
  });
  const onSubmit = (formData: any) => {
    mutate(formData);
    navigate("/");
  };
  return { onSubmit };
};

export default useSignIn;
