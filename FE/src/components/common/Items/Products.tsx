import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { CartIcon, HeartIcon } from "../../../resources/svg/Icon/Icon";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";

const Products = ({ items }: any) => {
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  const { mutate } = Mutation_Cart("ADD");
  function addCart(id: string) {
    const item = {
      userId: account,
      productId: id,
      quantity: 1
    }
    mutate(item)
  }
  return (
    <>
      <div className="w-full text-start flex flex-col justify-between gap-y-6 shadow-md " key={items?._id}>
        <div className="relative group rounded w-full h-[60%] overflow-hidden bg-[#F6F6F6]">
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items?._id}`}
            className="h-full cursor-pointer *:drop-shadow"
          >
            <img
              className="group-hover:scale-105 duration-500 w-full h-full lg:px-8 mb:px-10 lg:py-6 mb:py-6"
              loading="lazy"
              src={items?.image_product}
              alt={items?.name}
            />
          </Link>
          {/* hover show icon cart */}
          <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
            <>
              <button onClick={() => addCart(items?._id)} className="p-2 rounded *:cursor-pointer border-none hover:scale-110">
                <CartIcon />
              </button>
              <button
                className="p-2 rounded *:cursor-pointer border-none hover:scale-110">
                <HeartIcon />
              </button>
            </>
          </div>
        </div>

        <div className="flex flex-col justify-between h-[38%] pb-6 px-2">
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items?._id}`}
            className="text-xl font-medium text-gray-700 hover:text-black line-clamp-2">
            {items?.name_product}
          </Link>
          {/* <p className="text-sm font-normal text-red-900  my-2 ">
            {items?.name_product}
          </p> */}
          <p className="text-md font-semibold text-[#222222]">
            {items?.price_product.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
          </p>
          <div className="flex justify-center mt-4 items-center gap-x-4">
            <Link
              className="md:block mb:hidden bg-black text-white py-2 px-4 rounded hover:scale-105 duration-300 cursor-pointer"
              to={""}
            >
              Buy Now
            </Link>
          </div>
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
