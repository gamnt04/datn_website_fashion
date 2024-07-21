import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { HeartIcon } from "../../../resources/svg/Icon/Icon";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { EyeIcon } from "lucide-react";
import ProductModal from "../../../pages/Client/Preview/ProductModal";

const Products = ({ items }: any) => {
  const [user] = useLocalStorage("user", {});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const account = user?.user;

  if (!items || !items._id) {
    console.error("Items is undefined or missing _id:", items);
    return null;
  }

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
    } catch (error) {
      console.error("Error fetching product preview:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div
      className="w-full text-start flex flex-col justify-between rounded gap-y-4 border hover:border-black duration-200"
      key={items._id}
    >
      <div className="relative group rounded w-full h-[160px] md:h-[200px] overflow-hidden bg-[#F6F6F6]">
        <Link
          onClick={ScrollTop}
          to={`/shops/detail_product/${items._id}`}
          className="h-full cursor-pointer"
        >
          <img
            className="group-hover:scale-105 duration-500 w-full h-full"
            loading="lazy"
            src={items.image_product}
            alt={items.name_product}
          />
        </Link>
        {/* hover show icon cart */}
        <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
          <button className="p-2 rounded border-none hover:scale-110">
            <HeartIcon />
          </button>
          <button
            className="p-2 rounded border-none hover:scale-110"
            onClick={() => handlePreview(items._id)}
          >
            <EyeIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 pb-6 px-4">
        <Link
          onClick={ScrollTop}
          to={`/shops/detail_product/${items._id}`}
          className="text-base lg:text-lg font-medium text-gray-700 hover:text-black line-clamp-2"
        >
          {items.name_product}
        </Link>
        <p className="text-md font-semibold text-red-500">
          {items.price_product.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>

      {modalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Products;
