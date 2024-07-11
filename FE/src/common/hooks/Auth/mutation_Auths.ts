import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignIn, SignOut, SignUp } from "../../../_lib/Auth/Auth";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../Storage/useStorage";
import { useReducer } from "react";

type Actions = "SIGNIN" | "SIGNUP" | "SIGNOUT";
export const Mutation_Auth = (actions: Actions) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage("user", {});
  const { mutate, ...rest } = useMutation({
    mutationFn: async (user: any) => {
      switch (actions) {
        case "SIGNIN":
          return await SignIn(user);
        case "SIGNUP":
          return await SignUp(user);
        case "SIGNOUT":
          return await SignOut();
        default:
          return;
      }
    },
    onSuccess: (user: any) => {
      if (actions === "SIGNIN") {
        setUser(user);
        alert("Đăng Nhập Tài Khoản Thành Công");
        navigate("/");
        window.location.reload();
      } else if (actions === "SIGNUP") {
        alert("Đăng ký thành công");
        navigate("/login");
      } else if (actions === "SIGNOUT") {
        setUser(null);
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        alert("Đăng xuất thành công");
        navigate("/login");
        window.location.reload();
      }
    },
    onError: (error) => {
      console.error(error || "Kiểm tra lại server hoặc internet!");
      alert(
        actions === "SIGNIN"
          ? "Đăng nhập thất bại"
          : actions === "SIGNUP"
          ? "Đăng ký thất bại"
          : "Đăng xuất thất bại"
      );
    }
  });
  return { mutate, ...rest };
};
