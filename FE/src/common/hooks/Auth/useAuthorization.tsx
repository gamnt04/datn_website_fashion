import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useAuthorization = (requiredRole) => {
  const [authStatus, setAuthStatus] = useState({
    isAuthorized: false,
    isLoggedIn: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuthorization = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser || storedUser === "{}") {
        setAuthStatus({
          isAuthorized: false,
          isLoggedIn: false,
          isLoading: false,
        });
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        if (user && user.user) {
          setAuthStatus({
            isAuthorized: user.user.role === requiredRole,
            isLoggedIn: true,
            isLoading: false,
          });
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        console.error("Lỗi khi phân tích dữ liệu người dùng:", error);
        localStorage.removeItem("user");
        setAuthStatus({
          isAuthorized: false,
          isLoggedIn: false,
          isLoading: false,
        });
      }
    };

    checkAuthorization();
  }, [requiredRole]);

  return authStatus;
};
