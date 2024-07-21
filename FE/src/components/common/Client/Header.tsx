import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { CartIcon, HeartIcon } from "../../../resources/svg/Icon/Icon";
import Nav_Mobile, { Nav_Desktop } from "./Nav";
import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";

const Header = () => {
  const navigate = useNavigate();
  const ref_user = useRef<HTMLAnchorElement>(null);
  const ref_login = useRef<HTMLAnchorElement>(null);
  const [toggle_Menu_Mobile, setToggle_Menu_Mobile] = useState<boolean>(false);
  const toggleFixedHeader = useRef<HTMLDivElement>(null);
  // const { calculateTotalProduct } = useCart();
  const toggleForm = useRef<HTMLFormElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const account = user?.user?._id;
  const { data } = List_Cart(account);
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
  useEffect(() => {
    function change_local() {
      if (account) {
        ref_login.current?.classList.add('hidden');
        ref_login.current?.classList.remove('block');
        ref_user.current?.classList.add('block');
        ref_user.current?.classList.remove('hidden');
      } else {
        ref_login.current?.classList.add('block');
        ref_login.current?.classList.remove('hidden');
        ref_user.current?.classList.add('hidden');
        ref_user.current?.classList.remove('block');
      }
    }
    change_local();
    window.addEventListener('storage', change_local);
    return () => {
      window.removeEventListener('storage', change_local);
    }
  }, [account])
  // toogle menu mobile
  const toggleMenuMobile = () => {
    setToggle_Menu_Mobile(!toggle_Menu_Mobile);
  };
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            className="lg:hidden fixed w-[40vw] duration-300 z-[-1] py-2 bg-white top-[50px] left-0 rounded"
          >
            <Nav_Mobile />
          </div>

          <div className="flex items-center gap-x-20">
            {/* logo */}
            <Link
              onClick={ScrollTop}
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
            <Nav_Desktop />
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
            {/* {account ? '/cart' : (
                <div onClick={() => onlogin()} className="relative">
                  <CartIcon />
                  <MiniCart />
                </div>
              )} */}

            <Link className="group *:duration-300 relative py-1" onClick={ScrollTop} to={account ? '/cart' : '/login'}>
              <span className="absolute bg-red-500 px-1 text-white text-xs py-[1px] rounded-xl -top-1/4 -right-1/2">{data?.products?.length}</span>
              <div className="group-hover:scale-110 opacity-75 hover:opacity-100 *:w-5 *:h-5">
                <CartIcon />
              </div>
            </Link>

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
            <div className="cursor-pointer hover:scale-105 duration-300">
              <Link ref={ref_user} to={'/allorder'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-check"><path d="M2 21a8 8 0 0 1 13.292-6" /><circle cx="10" cy="8" r="5" /><path d="m16 19 2 2 4-4" /></svg>
              </Link>
              <Link ref={ref_login}
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
        className={`relative w-[298px] *:h-[36px] lg:invisible gap-x-2 shadow-2xl mt-6 duration-300 mx-auto top-[50px]`}
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
      <div
        onClick={toggleMenuMobile}
        style={{ display: toggle_Menu_Mobile ? "block" : "none" }}
        className="fixed w-screen border-none z-[1] top-0 left-0 h-screen bg-[#33333388]"
      ></div>
    </>
  );
};

export default Header;



// (
//   <Link to="/cart" onClick={ScrollTop} className="relative">
//     <CartIcon />
//     {calculateTotalProduct() > 0 ? (
//       <span className="absolute -top-3 -right-3 text-xs rounded-[50%] w-[25px] grid place-items-center h-[1.5rem] bg-[#F68E56] text-white">
//         {calculateTotalProduct() > 99
//           ? "99+"
//           : calculateTotalProduct()}
//       </span>
//     ) : (
//       <span className="absolute -top-3 -right-3 text-xs rounded-[50%] w-[25px] grid place-items-center h-[1.5rem] bg-[#F68E56] text-white">
//         0
//       </span>
//     )}
//     {/* <MiniCart /> */}
//   </Link>
// )