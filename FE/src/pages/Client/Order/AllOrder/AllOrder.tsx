import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { List_Auth } from "../../../../common/hooks/Auth/querry_Auth";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import Logout from "../../../../common/hooks/Auth/Logout";
const AllOrder = () => {
  const { mutate } = Logout();
  const [isOpen, setIsOpen] = useState(false);
  const handleTogggle = () => {
    setIsOpen(!isOpen);
  };
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const routing = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined") {
      !userId && routing("/");
    }
  }, [userId]);
  const { data } = List_Auth(userId);
  return (
    <div className="xl:w-[1440px] w-[95vw] mx-auto">
      <div className="mt-20 mb-4">
        <div className="flex flex-row space-x-5 relative">
          <div className="basis-full overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrder;
