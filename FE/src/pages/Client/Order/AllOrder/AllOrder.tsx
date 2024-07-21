import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { List_Auth } from "../../../../common/hooks/Auth/querry_Auth";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
const AllOrder = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleTogggle = () => {
    setIsOpen(!isOpen)
  }
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const routing = useNavigate();
  useEffect(() => {
    if(typeof window !== 'undefined' ) {
      (!userId) && routing('/')
    }
  }, [userId])
  const { data } = List_Auth(userId)
  return (
    <div className="mt-28 mb-4">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-row space-x-5 relative">
          <div className="basis-28 lg:basis-3/12 border rounded-lg">
            <div className="lg:flex gap-4 pt-[15px] px-3 pb-[15px] border-b-2 ">
              <div className="flex justify-center">
                <img
                  className="w-[46px] h-[46px] rounded-full"
                  src={data?.avatar}
                  alt=""
                />
              </div>
              <div className="">
                <h3 className="text-[#333] text-[12px] lg:text-[16px] font-semibold text-center py-1">{data?.userName}</h3>
                <a
                  href="/allorder"
                  className="text-[#9B9B9B] text-center text-[12px] lg:text-sm flex items-center justify-center font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9B9B9B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil pr-[3px] lg:block hidden"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Sửa Hồ Sơ
                </a>
              </div>
            </div>
            <div className="px-3">
              <ul className="mb-12 *:my-4">
                <li>
                  <a href="#" onClick={handleTogggle} className="flex justify-center lg:flex lg:justify-start lg:gap-4 *:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0145AD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-user"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                    </svg>
                    <p className="hidden lg:block" >Tài khoản của tôi</p>
                  </a>
                  {isOpen && (
                    <ul className="pt-2">
                      <li><NavLink to={`/allorder`} className="flex justify-center lg:justify-start lg:ml-10 text-sm text-center text-[#7D7D7D] py-1">Hồ sơ</NavLink></li>
                      <li><NavLink to={`/allorder/address`} className="flex justify-center lg:justify-start lg:ml-10 text-sm text-center text-[#7D7D7D] py-1">Địa chỉ</NavLink></li>
                      <li><a href="#" className="flex justify-center lg:justify-start lg:ml-10 text-sm text-center text-[#7D7D7D] py-1">Đổi mật khẩu</a></li>
                    </ul>
                  )}
                </li>
                <li>
                  <NavLink to={`/allorder/order`} className="flex justify-center  lg:flex lg:justify-start lg:gap-4 *:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0145AD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clipboard-list"
                    >
                      <rect
                        width="8"
                        height="4"
                        x="8"
                        y="2"
                        rx="1"
                        ry="1"
                      />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="M12 11h4" />
                      <path d="M12 16h4" />
                      <path d="M8 11h.01" />
                      <path d="M8 16h.01" />
                    </svg>
                    <p className="hidden lg:block" >Đơn hàng của tôi</p>
                  </NavLink>
                </li>
                <li>
                  <a href="#" className="flex justify-center  lg:flex lg:justify-start lg:gap-4 *:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0145AD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <p className="hidden lg:block" >Đăng xuất</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-full overflow-hidden">
            <Outlet />
          </div>

        </div>
      </div>
    </div >
  );
};

export default AllOrder;
