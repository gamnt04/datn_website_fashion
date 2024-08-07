import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { HeartIcon, HeartIconRed } from "../../../resources/svg/Icon/Icon";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import ProductModal from "../../../pages/Client/Preview/ProductModal";
import { Mutation_FavouriteProduct } from "../../../common/hooks/FavoriteProducts/mutation_FavouriteProducts";
import { message } from "antd";
import { useListFavouriteProducts } from "../../../common/hooks/FavoriteProducts/FavoriteProduct";

const Products = ({ items }) => {
  const [messageApi, contentHolder] = message.useMessage();
  const [user] = useLocalStorage("user", {});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const account = user?.user;
  const userId = account?._id;
  const { data: FavoriteData } = useListFavouriteProducts(userId);
  const { mutate: AddFavouriteProduct } = Mutation_FavouriteProduct("ADD");
  const { mutate: RemoveFavouriteProduct } =
    Mutation_FavouriteProduct("REMOVE");

  if (!items || !items._id) {
    console.error("Items is undefined or missing _id:", items);
    return null;
  }

  const handlePreview = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:2004/api/v1/products/${id}`
      );
      const product = await response.json();
      setSelectedProduct(product);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching product preview:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const checkFavourite = (productId: string) => {
    if (FavoriteData?.products?.length > 0) {
      return FavoriteData.products.some(
        (product: any) => product?.productId?._id === productId
      );
    }
  };

  const handleAddToFavorites = (productId: any) => {
    if (!userId) {
      message.open({
        type: "warning",
        content:
          "Hãy đăng nhập tài khoản của bạn để có thể thêm được sản phẩm yêu thích !!!",
      });
    } else {
      message.open({
        type: "success",
        content: "Đã thêm sản phẩm vào danh mục yêu thích của bạn",
      });
      AddFavouriteProduct({ userId, productId });
    }
  };

  const handleRemoveFromFavorites = (productId: any) => {
    message.open({
      type: "success",
      content: "Đã Xóa sản phẩm khỏi danh mục yêu thích của bạn",
    });
    RemoveFavouriteProduct({ userId, productId });
  };

  return (
    <div
      className="flex flex-col justify-between w-full mb-4 lg:mb-14  lg:-mt-14 border rounded  gap-y-5 hover:shadow-lg overflow-hidden"
      key={items._id}
    >
      <div className="relative group w-full h-[160px] md:h-[200px] lg:h-[220px]  bg-[#F6F6F6]">
        <Link
          onClick={ScrollTop}
          to={`/shops/detail_product/${items._id}`}
          className="h-full cursor-pointer"
        >
          <img
            className="w-full h-full"
            loading="lazy"
            src={items.image_product}
            alt={items.name_product}
          />
        </Link>
        {/* hover show icon cart */}
        <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
          <div className="absolute flex flex-col rounded top-0 p-1 right-0">
            {account ? (
              checkFavourite(items?._id) ? (
                <button
                  className="p-2 border-none rounded"
                  onClick={() => handleRemoveFromFavorites(items?._id)}
                >
                  <HeartIconRed />
                </button>
              ) : (
                <button
                  className="p-2 border-none rounded"
                  onClick={() => handleAddToFavorites(items?._id)}
                >
                  <HeartIcon />
                </button>
              )
            ) : (
              <button
                className="p-2 border-none rounded"
                onClick={() => handleAddToFavorites(items?._id)}
              >
                <HeartIcon />
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center flex-col px-4 pb-6 gap-y-2">
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items?._id}`}
            className="text-md text-center font-normal text-gray-700 lg:text-[16px] hover:text-black line-clamp-2"
          >
            {items?.name_product}
          </Link>
          <p className="font-normal text-gray-700 text-[16px]">
            {items?.price_product?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>

        {modalOpen && selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default Products;
