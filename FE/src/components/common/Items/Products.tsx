import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { CartIcon, HeartIcon } from "../../../resources/svg/Icon/Icon";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { EyeIcon } from "lucide-react";
import { Mutation_Preview } from "../../../common/hooks/Preview/Mutation_Preview";
import ProductModal from "../../../pages/Client/Preview/ProductModal";

const Products = ({ items }: any) => {
  const [user] = useLocalStorage("user", {});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const account = user?.user;
  const { mutate: addMutate } = Mutation_Cart("ADD");
  const { mutate: previewMutate } = Mutation_Preview();

  if (!items || !items._id) {
    console.error("Items is undefined or missing _id:", items);
    return null;
  }

  const addCart = (id: string) => {
    const item = {
      userId: account,
      productId: id,
      quantity: 1,
    };
<<<<<<< HEAD
    mutate(item);
  }
=======
    addMutate(item);
  };

  const handlePreview = async (id: string) => {
    try {
      // Gọi API để lấy thông tin sản phẩm
      const response = await fetch(
        `http://localhost:2004/api/v1/products/${id}`
      ); // Thay thế với URL thực tế
      const product = await response.json();

      // Thay đổi trạng thái modal và sản phẩm được chọn
      setSelectedProduct(product);
      setModalOpen(true);

      // Gọi mutate để cập nhật trạng thái xem trước
      previewMutate({ userId: account, productId: id });
    } catch (error) {
      console.error("Error fetching product preview:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

>>>>>>> fca56ef998c7c951718d08a15a2765d5009ddb53
  return (
    <div
      className="w-full text-start flex flex-col justify-between gap-y-6 shadow-md"
      key={items._id}
    >
      <div className="relative group rounded w-full h-[60%] overflow-hidden bg-[#F6F6F6]">
        <Link
          onClick={ScrollTop}
          to={`/shops/detail_product/${items._id}`}
          className="h-full cursor-pointer"
        >
          <img
            className="group-hover:scale-105 duration-500 w-full h-full lg:px-8 mb:px-10 lg:py-6 mb:py-6"
            loading="lazy"
            src={items.image_product}
            alt={items.name_product}
          />
        </Link>
        {/* hover show icon cart */}
        <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
          <button
            onClick={() => addCart(items._id)}
            className="p-2 rounded border-none hover:scale-110"
          >
<<<<<<< HEAD
            <img
              className="group-hover:scale-105 duration-500 w-full h-full lg:px-8 mb:px-10 lg:py-6 mb:py-6"
              loading="lazy"
              src={items.image_product}
              alt={items.name}
            />
          </Link>
          {/* hover show icon cart */}
          <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
            <>
              <button
                onClick={() => addCart(items._id)}
                className="p-2 rounded *:cursor-pointer border-none hover:scale-110"
              >
                <CartIcon />
              </button>
              <button className="p-2 rounded *:cursor-pointer border-none hover:scale-110">
                <HeartIcon />
              </button>
            </>
          </div>
        </div>

        <div>
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items._id}`}
            className="text-xl font-medium text-gray-700 hover:text-black"
          >
            {items.name_product}
          </Link>
          <p className="text-sm font-normal text-[#999999] my-2">
            {items.name_product}
          </p>
          <p className="text-md font-semibold text-[#222222]">
            {items.price_product.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <div className="flex justify-center mt-4 items-center gap-x-4">
            <Link
              className="md:block mb:hidden bg-black text-white py-2 px-4 rounded hover:scale-105 duration-300 cursor-pointer"
              to={""}
            >
              Buy Now
            </Link>
          </div>
=======
            <CartIcon />
          </button>
          <button className="p-2 rounded border-none hover:scale-110">
            <HeartIcon />
          </button>
          <button
            className="p-2 rounded border-none hover:scale-110"
            onClick={() => handlePreview(items._id)}
          >
            <EyeIcon />
          </button>
>>>>>>> fca56ef998c7c951718d08a15a2765d5009ddb53
        </div>
      </div>

      <div className="flex flex-col justify-between h-[38%] pb-6 px-2">
        <Link
          onClick={ScrollTop}
          to={`/shops/detail_product/${items._id}`}
          className="text-xl font-medium text-gray-700 hover:text-black line-clamp-2"
        >
          {items.name_product}
        </Link>
        <p className="text-md font-semibold text-[#222222]">
          {items.price_product.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <div className="flex justify-center mt-4 items-center gap-x-4">
          <Link
            className="md:block mb:hidden bg-black text-white py-2 px-4 rounded hover:scale-105 duration-300 cursor-pointer"
            to={`/cart/pay/${items._id}`}
          >
            Buy Now
          </Link>
        </div>
      </div>

      {modalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Products;
