import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MiniCart from "../../../pages/Client/(Cart)/[MiniCart]";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { CartIcon, HeartIcon, NoteIcon, SearchIcon, SettingIcon } from "../../../resources/svg/Icon/Icon";
import { useDispatch } from "react-redux";
// import { SearchData } from "../../Services/Search";

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle_Menu_Mobile, setToggle_Menu_Mobile] = useState<boolean>(false);
  const [scrollHeader, setScrollHeader] = useState<string>('fixed bg-white duration-300 z-[4] top-0 w-full h-[100px] grid xl:place-items-center mb:grid-cols-[95%] justify-center');
  // change scroll header
  useEffect(() => {
    window.addEventListener('scroll', () => {
      (scrollY > 150) ? setScrollHeader('fixed bg-white duration-300 z-[4] h-[80px] top-0 w-full grid xl:place-items-center mb:grid-cols-[95%] justify-center shadow-xl')
        : setScrollHeader('fixed bg-white duration-300 z-[4] top-0 w-full h-[100px] grid xl:place-items-center mb:grid-cols-[95%] justify-center');
    });
  }, [scrollHeader]);

  // change title by redux 
  const dispatch = useDispatch();
  const ChangeTitle_1 = () => {
    dispatch({ type: "Title_change_1" });
  }

  // Fn scroll top and change title 
  const ScrollTop_and_Change = async () => {
    await ScrollTop();
    await ChangeTitle_2();
  }

  const ChangeTitle_2 = () => {
    dispatch({ type: "Title_change_2" });
  }


  // change search
  const changeInput = () => {
    setToggle(!toggle);
    (toggle_Menu_Mobile) ?
      setToggle_Menu_Mobile(false) : ''
  }

  // toogle menu mobile
  const toggleMenuMobile = () => {
    setToggle_Menu_Mobile(!toggle_Menu_Mobile)
  }
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

  return (<>
    <div className={scrollHeader}>
      <header className="relative xl:w-[1440px] h-full flex justify-between items-center mb:w-full">
        {/* menu mobile */}
        <button onClick={toggleMenuMobile} className="*:w-[40px] *:h-[40px] cursor-pointer mb:block lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        </button>

        {/* toggle menu mobile */}
        <div style={{ transform: toggle_Menu_Mobile ? 'translateX(0%)' : 'translateX(-200%)' }} className="lg:hidden fixed w-[40vw] duration-300 left-0 top-0 z-[-1] pt-[100px] bg-white">
          <nav className="flex flex-col justify-between *:my-1 *:px-8 *:py-2 *:font-medium *:capitalize *:relative *:duration-300">
            <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/"}> home </NavLink>
            <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/shops"}> shop </NavLink>
            {/* <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/categories"}> categories </NavLink> */}
            <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/blog"}> blog </NavLink>
            <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/contact"}> contact </NavLink>
            <NavLink className={({ isActive }) => isActive ? "opacity-100 bg-gray-200" : "opacity-[0.70] hover:bg-gray-200"} to={"/pages"}> pages </NavLink>
          </nav>

        </div>



        {/* logo */}
        <Link to="/" className="h-auto mr-2 w-28 flex items-start">
          <img
            className="lg:w-[50px] h-[40px]"
            src="../../src/assets/Images/Logo/logo.png"
            alt="Logo"
          />
        </Link>


        {/* menu desktop*/}
        {/* map() => render routing*/}
        <nav className="mb:hidden lg:block lg:flex justify-between items-center fixed left-1/2 -translate-x-1/2 *:xl:mx-5 *:lg:mx-4 *:font-semibold
         *:capitalize *:relative *:duration-300 *:after:content-[''] *:after:duration-300 *:after:absolute *:after:w-0 *:after:right-1/2 *:after:bottom-[-30%] *:after:h-[2px] *:after:bg-orange-600
          *:after:rounded-lg *:before:content-[''] *:before:absolute *:before:h-[2px] *:before:right-0 *:before:bg-orange-600  *:before:bottom-[-30%]  *:before:rounded-lg">
          <NavLink onClick={ScrollTop} className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/"}> home </NavLink>
          <NavLink onClick={ScrollTop_and_Change} className={({ isActive }) => isActive ? "group opacity-100 before:w-full pr-4 flex items-center group" : "group group flex pr-4 items-center opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"shops"}>
            shops
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="absolute duration-300 -right-1 group-hover:rotate-180 lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>

            {/*list menu hover */}
            <div className="group-hover:scale-100 scale-0 duration-300 fixed w-full before:content-[''] before:absolute before:w-[80px] before:h-[20px]
            before:left-[20%] before:top-[-18px] top-0 left-1/2 -translate-x-2/3 -translate-y-1/4 group-hover:-translate-x-1/2 group-hover:translate-y-[30%]">
              <div className="grid grid-cols-[45%_45%] justify-between gap-[10px] text-center bg-white shadow-2xl rounded p-4 *:text-sm *:font-medium *:capitalize *:duration-300">
                <NavLink className="hover:text-orange-600" to={'/shops'}>Product collections</NavLink>
                <NavLink className="hover:text-orange-600" to={'/shops'}>Product collections</NavLink>
                <NavLink className="hover:text-orange-600" to={'/shops'}>Product collections</NavLink>
                <NavLink className="hover:text-orange-600" to={'/shops'}>Product collections</NavLink>
                <NavLink className="hover:text-orange-600" to={'/shops'}>Product collections</NavLink>
                <NavLink className="hover:text-orange-600" to={'/shops'}>Product collections</NavLink>
              </div>
            </div>
          </NavLink>
          {/* <NavLink onClick={ScrollTop} className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/categories"}> categories </NavLink> */}
          <NavLink onClick={ScrollTop} className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/blog"}> blog </NavLink>
          <NavLink onClick={ScrollTop} className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/contact"}> contact </NavLink>
          <NavLink onClick={ScrollTop} className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/pages"}> pages </NavLink>
        </nav>

        {/* options */}
        <nav className="flex items-center justify-between *:mx-3 *:duration-300">
          {/* search */}
          <Link onClick={changeInput} to={''} className="opacity-75 hover:opacity-100 hover:scale-[1.1]">
            <SearchIcon />
          </Link>
          {/* cart */}
          <div className="group *:duration-300">
            <Link to={'/cart'} onClick={ScrollTop} className="relative">
              <CartIcon />
              <span className="absolute -top-3 -right-3 text-xs rounded-[50%] w-[18px] grid place-items-center h-[1.3rem] bg-[#F68E56] text-white">0</span>
            </Link>
            {/* mini cart hover => active */}
            <MiniCart />
          </div>

          {/* heart */}
          <Link to={''} className="opacity-75 hover:opacity-100 hover:scale-[1.1]">
            <HeartIcon />
          </Link>
          {/* option / menu */}
          <div className="group cursor-pointer">
            <NoteIcon />
            {/* option */}
            <div className="absolute *:flex *:justify-center *:duration-300 opacity-0 *:gap-x-[10px] group-hover:scale-100 scale-0 group-hover:opacity-100 duration-300 flex flex-col before:content-[''] before:absolute 
            before:w-[35px] before:translate-y-[-100%] before:left-1/2 before:h-[12px] before:bg-none group-hover:translate-y-[10px] before:top-0 lg:p-4 gap-y-[10px] bg-white shadow rounded mb:p-2 lg:text-sm mb:text-xs 
            *:p-1 *:border right-0 *:rounded -translate-y-1/2 translate-x-1/2 group-hover:translate-x-0 before:translate-x-1/2">
              <Link className="hover:scale-110" to={'/login'}>Sign in</Link>
              <Link className="hover:scale-110" to={'/login/register'}>Sign up</Link>
              <Link className="hover:scale-110" to={'/allorder'}><SettingIcon /><span>Setting</span></Link>
            </div>
          </div>

        </nav>
      </header>


      {/* search */}
      <div style={{ transform: toggle ? 'translateY(0)' : 'translateY(-200%)' }} className="border-none duration-300 absolute w-full flex flex-col items-center justify-center h-[100px] z-[5] bg-white top-0">
        <div className="flex items-center justify-center">
          <form className="flex *:h-[40px] *:border-2 ">
            <input className="border-black w-[50vw] rounded-2xl px-4" type="text" placeholder="Search" />
            <button className="border-none -translate-x-[150%] cursor-pointer hover:scale-[1.1]duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
          </form>
          <button onClick={changeInput} className="border w-[40px] h-[40px] border-none hover:scale-[1.05] duration-300 bg-black text-white font-bold rounded-[50%] -translate-x-[20%] grid place-items-center">X</button>
        </div>

        {/* items search */}
        <div className="absolute w-[55vw] h-auto border bg-white mt-[100px] *:list-none *:px-2 *:py-1">
          {/* {
            itemsSearch?.map((items) => (
              <li>{items}</li>
            ))
          } */}
        </div>

      </div>
      {/* lớp phủ */}
      <div onClick={changeInput} style={{ display: toggle ? 'block' : 'none' }} className="fixed w-full border-none z-[4] h-full bg-[#33333388]"></div>
    </div>
    {/* lớp phủ */}
    <div onClick={toggleMenuMobile} style={{ display: toggle_Menu_Mobile ? 'block' : 'none' }} className="fixed w-screen border-none z-[1] top-0 left-0 h-screen bg-[#33333388]"></div>
  </>)
}

export default Header