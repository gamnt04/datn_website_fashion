import { Link } from "react-router-dom";
import { CartIcon, HeartIcon } from "../../../resources/svg/Icon/Icon";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";

interface dataProps {
  img_product?: string | number;
  i?: string | number
}

const Products = ({ data }: dataProps) => {

  const ahihi = () => {
    alert(123)
  }

  return (
    <div className="w-full h-full text-start  flex flex-col justify-between">
      <div className="relative group rounded w-full h-[70%] overflow-hidden bg-[#F6F6F6]">
        <Link onClick={ScrollTop} to={'/shops/detail_product'} className="h-full cursor-pointer *:drop-shadow">
          <img className="group-hover:scale-105 duration-500 w-full h-full lg:px-8 mb:px-10 lg:py-6 mb:py-6" loading="lazy" src={data.img_product} />
        </Link>
      {/* hover show icon cart */}
      <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
      <button onClick={ahihi} className="p-2 rounded *:cursor-pointer border-none hover:scale-110">
        <CartIcon />
      </button>
      <button onClick={ahihi} className="p-2 rounded *:cursor-pointer border-none hover:scale-110">
        <HeartIcon />
      </button>
      </div>
      </div>

      <div>
        <Link onClick={ScrollTop} to={'/shops/detail_product'} className="text-xl font-medium text-gray-700 hover:text-black">
          Dome Lamp {data.i}
        </Link>
        <p className="text-sm font-normal text-[#999999] my-2">
          Title san pham
        </p>
        <p className="text-md font-semibold text-[#222222]">
          2.000.000 VND
        </p>
        {/* <div className="flex justify-center mt-4 items-center gap-x-4">
            <Link className="md:block mb:hidden bg-black text-white py-2 px-4 rounded hover:scale-105 duration-300 cursor-pointer" to={''}>Buy Now</Link>
            </div> */}
      </div>

      {/* <div className="flex justify-center gap-2 mt-4">
              <img
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={data.img_product}
                alt=""
              />
              <img
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={data.img_product}
                alt=""
              />
              <img
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={data.img_product}
                alt=""
              />
            </div> */}
    </div>
  )
}

export default Products