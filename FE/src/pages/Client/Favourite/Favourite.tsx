import { HeartIconRed } from "../../../resources/svg/Icon/Icon";
import { useListFavouriteProducts } from "../../../common/hooks/FavoriteProducts/FavoriteProduct";
import { IProduct } from "../../../common/interfaces/Product";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Link } from "react-router-dom";
import { message } from "antd";
import { Mutation_FavouriteProduct } from "../../../common/hooks/FavoriteProducts/mutation_FavouriteProducts";

const Favourite = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  const userId = account?._id;
  const { mutate: RemoveFavouriteProduct } =
    Mutation_FavouriteProduct("REMOVE");
  const { data, isLoading, isError, error } = useListFavouriteProducts(userId);
  const handleRemoveFavorites = (productId: string) => {
    if (!userId) {
      messageApi.open({
        type: "warning",
        content: "Hãy đăng nhập tài khoản của bạn !!!",
      });
    } else {
      RemoveFavouriteProduct(
        { userId, productId },
        {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: "Đã xóa sản phẩm khỏi danh mục yêu thích của bạn",
            });
          },
          onError: () => {
            messageApi.open({
              type: "error",
              content: "Xóa sản phẩm yêu thích thất bại, vui lòng thử lại sau",
            });
          },
        }
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="lg:mt-[40px] mt-[60px] lg:w-[1440px] lg:mx-auto ">
      {contextHolder}
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        <Link to={`/`} className="text-gray-500 hover:text-black">
          Trang chủ
        </Link>
        <span className="mx-1 text-gray-500">&#10148;</span>
        Yêu thích
      </div>
      <div className="mt-8 grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:mx-auto lg:w-[1330px] lg:gap-x-[1.5%] lg:grid-cols-4 xl:auto-rows-[450px] justify-between gap-y-8">
        {data?.products.length === 0 ? (
          <div className="">Add product</div>
        ) : (
          data?.products?.map((items: IProduct) => (
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
                    src={items?.productId?.image_product}
                    alt={items?.productId?.name_product}
                  />
                </Link>
                <div className="absolute top-0 right-0 flex flex-col p-1 rounded">
                  <button
                    className="p-2 border-none rounded"
                    onClick={() => handleRemoveFavorites(items?.productId?._id)}
                  >
                    <HeartIconRed />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-4 pb-6 gap-y-2">
                <Link
                  onClick={ScrollTop}
                  to={`/shops/detail_product/${items?.productId?._id}`}
                  className="text-md text-center font-normal text-gray-700 lg:text-[16px] hover:text-black line-clamp-2"
                >
                  {items?.productId?.name_product}
                </Link>
                <p className="font-normal text-gray-700 text-[16px]">
                  {items?.productId?.price_product?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourite;
