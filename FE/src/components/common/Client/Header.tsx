import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MiniCart from "../../../pages/Client/(Cart)/[MiniCart]";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { CartIcon, HeartIcon } from "../../../resources/svg/Icon/Icon";
import { useDispatch } from "react-redux";
import { useCart } from "../../../common/hooks/Cart/useCart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
// import { SearchData } from "../../Services/Search";

const Header = () => {
  const navigate = useNavigate();
  const [toggle_Menu_Mobile, setToggle_Menu_Mobile] = useState<boolean>(false);
  const toggleFixedHeader = useRef<HTMLDivElement>(null);
  const { calculateTotalProduct } = useCart();
  const toggleForm = useRef<HTMLFormElement>(null);
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("scroll", () => {
        if (toggleFixedHeader.current && toggleForm.current) {
          window.scrollY > 100
            ? (toggleFixedHeader.current.classList.add(
                "animate-[animationScrollYHeader_1s]",
                "lg:-translate-y-3"
              ),
              toggleForm.current.classList.add("scale-0"))
            : (toggleFixedHeader.current.classList.remove(
                "animate-[animationScrollYHeader_1s]",
                "lg:-translate-y-3"
              ),
              toggleForm.current.classList.remove("scale-0"));
        }
      });
  }, []);
  // change title by redux
  const dispatch = useDispatch();
  // const ChangeTitle_1 = () => {
  //   dispatch({ type: "Title_change_1" });
  // }
  // Fn scroll top and change title
  const ScrollTop_and_Change = async () => {
    await ScrollTop();
    await ChangeTitle_2();
  };

  const ChangeTitle_2 = () => {
    dispatch({ type: "Title_change_2" });
  };

  // toogle menu mobile
  const toggleMenuMobile = () => {
    setToggle_Menu_Mobile(!toggle_Menu_Mobile);
  };
  // search
  // const [keyUrl, setKeyUrl] = useState<string>();
  // const [itemsSearch, setItemsSearch] = useState();
  // const handleSearchData = (e: any) => {
  //   setTimeout(() => {
  //     setKeyUrl(e.target.value);
  //   }, 2000)
  // }
  // useEffect(() => {
  //   handleSearchData;
  //    (keyUrl !== '') ?
  //     (async () => {
  //     try {
  //       const data = await SearchData(keyUrl);
  //       console.log(data);

  //       setItemsSearch(data);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })() : '';
  // }, [keyUrl]);
  // console.log(itemsSearch);
  const onlogin = () => {
    const comfirm = window.confirm("Do you want to go to the login page?");
    if (comfirm) {
      navigate("/login");
    }
  };
  return (
    <>
      <div
        ref={toggleFixedHeader}
        className="w-full fixed top-0 bg-white z-[6] shadow-[50px_15px_60px_-15px_rgba(0,0,0,0.3)]"
      >
        <header className="mx-auto relative xl:w-[1440px] flex justify-between items-center mb:w-[95vw] lg:h-20 lg:py-0 py-3">
          {/* menu mobile */}
          <button
            onClick={toggleMenuMobile}
            className="*:w-[30px] *:h-[30px] cursor-pointer mb:block lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          {/* toggle menu mobile */}
          <div
            style={{
              transform: toggle_Menu_Mobile
                ? "translateX(0%)"
                : "translateX(-200%)"
            }}
            className="lg:hidden fixed w-[40vw] duration-300 z-[-1] pt-[100px] bg-white"
          >
            <nav className="flex flex-col justify-between *:my-1 *:px-8 *:py-2 *:font-medium *:capitalize *:relative *:duration-300">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 bg-gray-200"
                    : "opacity-[0.70] hover:bg-gray-200"
                }
                to={"/"}
              >
                {" "}
                home{" "}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 bg-gray-200"
                    : "opacity-[0.70] hover:bg-gray-200"
                }
                to={"/shops"}
              >
                {" "}
                shop{" "}
              </NavLink>
              {/* <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/categories"}> categories </NavLink> */}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 bg-gray-200"
                    : "opacity-[0.70] hover:bg-gray-200"
                }
                to={"/blog"}
              >
                {" "}
                blog{" "}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 bg-gray-200"
                    : "opacity-[0.70] hover:bg-gray-200"
                }
                to={"/contact"}
              >
                {" "}
                contact{" "}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 bg-gray-200"
                    : "opacity-[0.70] hover:bg-gray-200"
                }
                to={"/pages"}
              >
                {" "}
                pages{" "}
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-x-20">
            {/* logo */}
            <Link
              to="/"
              className="lg:relative absolute lg:left-0 lg:translate-x-0 left-[35%] -translate-x-full h-auto mr-2 flex items-start"
            >
              <img
                className="lg:w-[50px] md:h-[40px] h-[35px]"
                src="../../src/assets/Images/Logo/logo.png"
                alt="Logo"
              />
            </Link>

            {/* menu desktop  ahihi test commit*/}
            {/* map() => render routing*/}
            <nav
              className="mb:hidden lg:block lg:flex justify-between items-center *:xl:mx-5 *:lg:mx-4 *:font-semibold
         *:capitalize *:relative *:duration-300 *:after:content-[''] *:after:duration-300 *:after:absolute *:after:w-0 *:after:right-1/2 *:after:bottom-[-30%] *:after:h-[2px] *:after:bg-orange-600
          *:after:rounded-lg *:before:content-[''] *:before:absolute *:before:h-[2px] *:before:right-0 *:before:bg-orange-600  *:before:bottom-[-30%]  *:before:rounded-lg"
            >
              <NavLink
                onClick={ScrollTop}
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 before:w-full"
                    : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"
                }
                to={"/"}
              >
                {" "}
                home{" "}
              </NavLink>
              <NavLink
                onClick={ScrollTop_and_Change}
                className={({ isActive }) =>
                  isActive
                    ? "group opacity-100 before:w-full flex items-center group"
                    : "group group flex items-center opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"
                }
                to={"shops"}
              >
                shops
              </NavLink>
              {/* <NavLink onClick={ScrollTop} className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/categories"}> categories </NavLink> */}
              <NavLink
                onClick={ScrollTop}
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 before:w-full"
                    : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"
                }
                to={"/blogs"}
              >
                {" "}
                blog{" "}
              </NavLink>
              <NavLink
                onClick={ScrollTop}
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 before:w-full"
                    : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"
                }
                to={"/contact"}
              >
                {" "}
                contact{" "}
              </NavLink>
              <NavLink
                onClick={ScrollTop}
                className={({ isActive }) =>
                  isActive
                    ? "opacity-100 before:w-full"
                    : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"
                }
                to={"/about-us"}
              >
                {" "}
                pages{" "}
              </NavLink>
            </nav>
          </div>

          {/* options */}
          <nav className="flex items-center justify-between *:mx-3 *:duration-300">
            {/* search */}
            <form
              className={`relative w-[298px] *:h-[36px] hidden lg:block gap-x-2 shadow-2xl duration-300`}
            >
              <input
                type="text"
                className="border rounded-full w-full pl-5 pr-14 text-sm outline-none font-normal text-gray-700"
                placeholder="Search"
              />
              <button className="absolute top-0 right-[2%] rounded-[50%] w-[36px] duration-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </form>
            {/* cart */}
            <div className="group *:duration-300 relative py-1">
              {account ? (
                <Link to="/cart" onClick={ScrollTop} className="relative">
                  <CartIcon />
                  {calculateTotalProduct() > 0 ? (
                    <span className="absolute -top-3 -right-3 text-xs rounded-[50%] w-[25px] grid place-items-center h-[1.5rem] bg-[#F68E56] text-white">
                      {calculateTotalProduct() > 99
                        ? "99+"
                        : calculateTotalProduct()}
                    </span>
                  ) : (
                    <span className="absolute -top-3 -right-3 text-xs rounded-[50%] w-[25px] grid place-items-center h-[1.5rem] bg-[#F68E56] text-white">
                      0
                    </span>
                  )}
                  <MiniCart />
                </Link>
              ) : (
                <div onClick={() => onlogin()} className="relative">
                  <CartIcon />
                  <MiniCart />
                </div>
              )}
            </div>

            {/* heart */}
            {account ? (
              <>
                <Link
                  to={"/favourite"}
                  className="opacity-75 hover:opacity-100 hover:scale-[1.1]"
                >
                  <HeartIcon />
                </Link>
              </>
            ) : (
              <>
                <div
                  onClick={() => onlogin()}
                  className="opacity-75 hover:opacity-100 hover:scale-[1.1]"
                >
                  <HeartIcon />
                </div>
              </>
            )}

            {/* option / menu */}
            <div className="cursor-pointer hover:scale-105 duration-300 border">
              <Link
                to={"/login"}
                className="bg-black px-4 py-1.5 text-white rounded font-medium text-sm border-none"
              >
                Login
              </Link>
            </div>
          </nav>
        </header>
      </div>
      {/* form search mobile */}
      <form
        ref={toggleForm}
        className={`relative w-[298px] *:h-[36px] lg:invisible gap-x-2 shadow-2xl mt-6 z-[-1] duration-300 mx-auto top-[50px]`}
      >
        <input
          type="text"
          className="border rounded-full w-full pl-5 pr-14 text-sm outline-none font-normal text-gray-700"
          placeholder="Search"
        />
        <button className="absolute top-0 right-[2%] rounded-[50%] w-[36px] duration-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>

      {/* lớp phủ */}
      {/* lớp phủ */}
      <div
        onClick={toggleMenuMobile}
        style={{ display: toggle_Menu_Mobile ? "block" : "none" }}
        className="fixed w-screen border-none z-[1] top-0 left-0 h-screen bg-[#33333388]"
      ></div>
    </>
  );
};

export default Header;
