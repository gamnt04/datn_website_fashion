import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { HeartIcon } from "../../../resources/svg/Icon/Icon";

const Products = ({ items }: any) => {
  return (
    <>
      <div
        className="w-full text-start flex flex-col justify-between gap-y-4 border hover:border-black duration-300 rounded"
        key={items?._id}
      >
        <div className="relative group rounded w-full h-[200px] lg:h-[250px] overflow-hidden bg-[#F6F6F6]">
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items?._id}`}
            className="h-full cursor-pointer *:drop-shadow"
          >
            <img
              className="duration-300 w-full h-full mb:px-10 group-hover:scale-105"
              loading="lazy"
              src={items?.image_product}
              alt={items?.name}
            />
          </Link>
          {/* hover show icon cart */}
          <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
            <button className="p-2 rounded *:cursor-pointer border-none hover:scale-110">
              <HeartIcon />
            </button>
          </div>
        </div>
        {/* name and price */}
        <div className="flex flex-col justify-between gap-y-4 lg:gap-y-6 pb-6 px-4 lg:px-6">
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items?._id}`}
            className="text-xl font-medium text-gray-700 hover:text-black line-clamp-2"
          >
            {items?.name_product}
          </Link>
          {/* <p className="text-sm font-normal text-red-900  my-2 ">
            {items?.name_product}
          </p> */}
          <p className="text-md font-semibold text-[#222222]">
            {items?.price_product.toLocaleString("vi", {
              style: "currency",
              currency: "VND"
            })}
          </p>
        </div>

        {/* <div className="flex justify-center gap-2 mt-4">
            {item.gallery?.map((image: File | string, index: number) => (
              <img
                key={index}
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={renderImage(image)}
                alt={`Gallery image ${index + 1}`}
              />
            ))}
          </div> */}
      </div>
    </>
  );
};

export default Products;
