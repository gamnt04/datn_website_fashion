import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/Storage/useStorage";
// import { useToast } from 'react-toastify';

const useSignIn = () => {
  // const toast = useToast();
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage("user", {});
  const { mutate } = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await instance.post(`auth/signin`, formData);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      alert("Đăng nhập thành công");
      // toast({
      //     title: "Đăng ký thành công",
      //     description: "You have successfully signed in.",
      //     status: "success",
      //     duration: 5000,
      //     isClosable: true,
      // });
    },
    onError: (error) => console.log(error)
  });
  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
    navigate("/");
  };
  return { onSubmit };
};

export default useSignIn;
