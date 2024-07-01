import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/Storage/useStorage";

const useSignIn = () => {
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
      navigate("/");
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
      alert("Đăng nhập thất bại");
    }
  });

  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
  };

  return { onSubmit };
};

export default useSignIn;
