import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
// import { SearchData } from "../../Services/Search";

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [scrollHeader, setScrollHeader] = useState<string>('fixed bg-white duration-300 z-[4] top-0 w-full h-[100px] grid grid-cols-[95%] justify-center');
  // change search
  const changeInput = () => {
    setToggle(!toggle);
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


  // change scroll header
  useEffect(() => {
    window.addEventListener('scroll', () => {
      (scrollY > 150) ? setScrollHeader('fixed bg-white duration-300 z-[4] h-[80px] top-0 w-full grid grid-cols-[95%] justify-center shadow-xl')
        : setScrollHeader('fixed bg-white duration-300 z-[4] top-0 w-full h-[100px] grid grid-cols-[95%] justify-center');
    });
  }, [scrollHeader]);

  return (
    <div className={scrollHeader}>
      <header className="relative h-full flex justify-between items-center w-full">
        {/* logo */}
        <Link to="/" className="h-auto mr-2 w-28 ">
          <img
            src="../../src/assets/Images/Logo/logo.png"
            alt="Logo"
          />
        </Link>

        {/* menu */}
          {/* sau dung map de render routing*/}
        <nav className="flex justify-between fixed left-1/2 -translate-x-1/2 *:mx-4 *:font-semibold *:uppercase *:relative *:duration-300 *:after:content-[''] 
        *:after:duration-300 *:after:absolute *:after:w-0 *:after:right-1/2 *:after:bottom-[-30%] *:after:h-[2px] *:after:bg-orange-600 *:after:rounded-lg 
        *:before:content-[''] *:before:absolute *:before:h-[2px] *:before:right-0 *:before:bg-orange-600  *:before:bottom-[-30%]  *:before:rounded-lg">
          <NavLink className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/"}> home </NavLink>
          <NavLink className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/shops"}> shop </NavLink>
          <NavLink className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/categories"}> categories </NavLink>
          <NavLink className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/blog"}> blog </NavLink>
          <NavLink className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/contact"}> contact </NavLink>
          <NavLink className={({ isActive }) => isActive ? "opacity-100 before:w-full" : "opacity-[0.70] hover:opacity-100 hover:after:w-full hover:after:right-0"} to={"/pages"}> pages </NavLink>
        </nav>

        {/* options */}
        <nav className="flex items-center justify-between *:mx-3 *:opacity-[0.75] *:duration-300">
          <Link onClick={changeInput} to={''} className="hover:opacity-100 hover:scale-[1.1]"><svg
            aria-hidden="true"
            focusable="false"
            className="transition-colors duration-300 modal__toggle-open icon"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 19.6 19.6"
            style={{
              fill: "currentColor",
              width: "20px",
              height: "20px",
            }}
            xmlSpace="preserve"
          >
            <path
              fill="currentColor"
              className="text-black group-hover:text-[#F68E56]"
              d="M19.3,18.3l-4.1-4.1c3.1-3.7,2.6-9.1-1.1-12.2S5.1-0.6,2,3.1s-2.6,9.1,1.1,12.2c3.2,2.7,7.9,2.7,11.1,0l4.1,4.1  c0.3,0.3,0.8,0.3,1.1,0S19.6,18.6,19.3,18.3L19.3,18.3z M1.5,8.7c0-3.9,3.2-7.1,7.1-7.1s7.1,3.2,7.1,7.1s-3.2,7.1-7.1,7.1  C4.7,15.8,1.5,12.6,1.5,8.7L1.5,8.7z"
            ></path>
          </svg></Link>

          <Link to={''} className="hover:opacity-100 hover:scale-[1.1]">
            <svg
              className="transition-colors duration-300 icon icon-cart-empty group-hover:fill-red-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 86.8 77.5"
              style={{
                width: "20px",
                height: "20px",
                fill: "currentColor",
              }}
              xmlSpace="preserve"
            >
              <path d="M68.7,77.5c-5.6,0-10.1-4.5-10.1-10.1s4.5-10.1,10.1-10.1s10.2,4.5,10.2,10.1C78.9,73,74.3,77.5,68.7,77.5z M68.7,62.6  c-2.6,0-4.7,2.2-4.7,4.8c0,2.6,2.2,4.7,4.8,4.7s4.7-2.2,4.7-4.8C73.5,64.8,71.3,62.6,68.7,62.6z"></path>
              <polygon points="23.4,51.5 12.4,5.4 0,5.4 0,0 16.7,0 27.8,46.1 73.4,46.1 80,19.9 48,19.9 48,14.5 86.8,14.5 77.7,51.5 "></polygon>
              <path d="M29.9,77.5c-5.5,0-10.1-4.7-10.1-10.2S24.5,57.2,30,57.2c5.6,0,10.1,4.6,10.1,10.2C40,73,35.4,77.5,29.9,77.5z M29.9,62.6  c-2.6,0-4.7,2.2-4.7,4.8c0,2.5,2.2,4.7,4.7,4.7c2.6,0,4.7-2.2,4.7-4.8C34.6,64.8,32.4,62.6,29.9,62.6z"></path>
            </svg>
          </Link>
          <Link to={''} className="hover:opacity-100 hover:scale-[1.1]">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="heart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="transition-colors duration-300 svg-inline--fa fa-heart fa-w-16 fa-1x icon"
              style={{
                width: "20px",
                height: "20px",
                fill: "currentColor",
              }}
            >
              <path
                fill="currentColor"
                className="text-black group-hover:text-[#F68E56]"
                d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
              ></path>
            </svg>
          </Link>
          <Link to={''} className="hover:opacity-100 hover:scale-[1.1]">
            <svg
              className="transition-colors duration-300 group-hover:stroke-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="17" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="17" y1="18" x2="3" y2="18"></line>
            </svg>
          </Link>
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
      {/* lớp giả */}
      <div onClick={changeInput} style={{ transform: toggle ? 'translateY(0)' : 'translateY(-200%)' }} className="fixed w-full border-none z-[4] h-full bg-[#33333388]"></div>
    </div>

  )
}

export default Header