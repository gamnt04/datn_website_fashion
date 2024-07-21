import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/Storage/useStorage";
import { toast } from "react-toastify";
const useSignIn = (userId: string) => {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage("user", {});
  const queryClient = useQueryClient()
 

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await instance.post(`auth/signin`, formData);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Đăng nhập thành công!");
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["AUTH_KEY", userId]
      })
    },
    onError: (error) => {
      toast.error("Đăng nhập thất bại!");
      return error;
    }
  });

  const onSubmit = (formData: { email: string; password: string }) => {
    mutate(formData);
  };

  return { onSubmit,  isPending, isError, error };
  // if (isPending) return <div>Pending...</div>
  // if (isError)  return <div>{error?.message}</div>
};

export default useSignIn;
