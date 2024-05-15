import { SearchIcon, CartIcon, HeartIcon, NoteIcon } from "../Icon";
const Header = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <header className="flex items-center h-[100px]">
        <a href="#">
          <img
            src="https://stark-ver2.myshopify.com/cdn/shop/files/stark-furniture-store-logo-1574495399.png?v=1693385678&width=500"
            alt="Logo"
          />
        </a>
        <nav className="flex-grow">
          <ul className="flex justify-center gap-10 text-base font-semibold text-[#222222]">
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                HOME
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                SHOP
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                CATEGORIES
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                BLOG
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                CONTACT
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                PAGES
              </a>
            </li>
          </ul>
        </nav>
        <nav className="ml-auto ">
          <ul className="flex items-center float-right gap-10">
            <li>
              <a href="#">
                <SearchIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <CartIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <HeartIcon />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white transition-colors duration-300 hover:text-orange-500"
              >
                <NoteIcon />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
