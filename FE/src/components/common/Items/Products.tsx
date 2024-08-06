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
<<<<<<< HEAD
  const { data: FavoriteData } = useListFavouriteProducts(userId);
  const { mutate: AddFavouriteProduct } = Mutation_FavouriteProduct("ADD");
  const { mutate: RemoveFavouriteProduct } =
    Mutation_FavouriteProduct("REMOVE");
=======
  const {
    data: FavoriteData,
    isLoading,
    isError,
    error,
    refetch
  } = useListFavouriteProducts(userId);
  const { mutate: AddFavouriteProduct } = Mutation_FavouriteProduct("ADD", {
    onSuccess: () => refetch()
  });
  const { mutate: RemoveFavouriteProduct } = Mutation_FavouriteProduct(
    "REMOVE",
    {
      onSuccess: () => refetch()
    }
  );
>>>>>>> main

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

<<<<<<< HEAD
  const checkFavourite = (productId: string) => {
    if (FavoriteData?.products?.length > 0) {
      return FavoriteData.products.some(
        (product) => product?.productId?._id === productId
      );
    }
=======
  const checkFavourite = (productId) => {
    return FavoriteData?.products?.some(
      (product) => product.productId._id === productId
    );
>>>>>>> main
  };

  const handleAddToFavorites = (productId) => {
    if (!userId) {
      message.open({
        type: "warning",
        content:
          "Hãy đăng nhập tài khoản của bạn để có thể thêm được sản phẩm yêu thích !!!"
      });
    } else {
      message.open({
        type: "success",
        content: "Đã thêm sản phẩm vào danh mục yêu thích của bạn"
      });
      AddFavouriteProduct({ userId, productId });
    }
  };

  const handleRemoveFromFavorites = (productId) => {
    message.open({
      type: "success",
      content: "Đã Xóa sản phẩm khỏi danh mục yêu thích của bạn"
    });
    RemoveFavouriteProduct({ userId, productId });
  };

<<<<<<< HEAD
=======
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>{error.message}</div>;

>>>>>>> main
  return (
    <>
      {contentHolder}
      <div
        className="flex flex-col justify-center items-center lg:w-[310px] duration-200 rounded text-start gap-y-4"
        key={items._id}
      >
        <div className="relative group w-full h-[160px] md:h-[200px] lg:h-[389px] lg:w-[310px] overflow-hidden bg-[#F6F6F6]">
          <Link
            onClick={ScrollTop}
            to={`/shops/detail_product/${items._id}`}
            className="h-full cursor-pointer"
          >
            <img
              className="w-full h-full duration-500 group-hover:scale-105"
              loading="lazy"
              src={items?.image_product}
              alt={items?.name_product}
            />
          </Link>
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
              currency: "VND"
            })}
          </p>
        </div>

        {modalOpen && selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default Products;
