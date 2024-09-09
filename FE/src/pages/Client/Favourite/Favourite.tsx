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
        content: "Hãy đăng nhập tài khoản của bạn !!!"
      });
    } else {
      RemoveFavouriteProduct(
        { userId, productId },
        {
          onSuccess: () => {
            messageApi.open({
              type: "success",
              content: "Đã xóa sản phẩm khỏi danh mục yêu thích của bạn"
            });
          },
          onError: () => {
            messageApi.open({
              type: "error",
              content: "Xóa sản phẩm yêu thích thất bại, vui lòng thử lại sau"
            });
          }
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
      <div className="overflow-x-scroll py-4 hidden_scroll-x_trendingproducts scroll-smooth listProductsTrendingChild grid grid-flow-col lg:gap-x-[1.5%]  mb:auto-cols-[48%] md:auto-cols-[33%] lg:auto-cols-[24%]">
        {data?.products.length === 0 ? (
          <div className="">Add product</div>
        ) : (
          data?.products?.map((items: IProduct) => {
            let min: number | undefined;
            let max: number | undefined;

            if (items?.productId?.attributes?.values) {
              // Initialize min and max based on the first size's price
              min =
                items?.productId?.attributes?.values[0]?.size[0]
                  ?.price_attribute;
              max =
                items?.productId?.attributes?.values[0]?.size[0]
                  ?.price_attribute;

              // Iterate through all values and sizes to find min and max prices
              items?.productId?.attributes?.values.forEach((value) => {
                value.size.forEach((size) => {
                  if (size.price_attribute < min!) {
                    min = size.price_attribute;
                  }
                  if (size.price_attribute > max!) {
                    max = size.price_attribute;
                  }
                });
              });
            }

            return (
              <div
                className="flex flex-col justify-between w-full gap-y-5"
                key={items?.productId?._id}
              >
                <div className="relative w-full group">
                  <Link
                    onClick={ScrollTop}
                    to={`/shops/${items?.productId?._id}`}
                    className="h-full cursor-pointer"
                  >
                    <img
                      className="w-full h-[250px] lg:h-[400px] object-cover bg-[#f3f3f3]"
                      loading="lazy"
                      src={items?.productId?.image_product}
                      alt={items?.productId?.name_product}
                    />
                  </Link>
                  <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
                    <div className="absolute top-0 right-0 flex flex-col p-1 rounded">
                      <button
                        className="p-2 border-none rounded"
                        onClick={() =>
                          handleRemoveFavorites(items?.productId?._id)
                        }
                      >
                        <HeartIconRed />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center px-4 py-4 gap-y-2">
                    <Link
                      onClick={ScrollTop}
                      to={`/shops/${items?.productId?._id}`}
                      className="text-md text-center font-bold lg:text-[16px] hover:text-black line-clamp-2"
                    >
                      {items?.productId?.name_product.length > 15
                        ? `${items?.productId?.name_product.slice(0, 50)}...`
                        : items?.productId?.name_product}
                    </Link>
                    {items?.productId?.attributes?.values ? (
                      <div className="flex items-center gap-x-1 line-clamp-2">
                        {min === max ? (
                          <span className="text-[#EB2606]">
                            {max?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND"
                            })}
                          </span>
                        ) : (
                          <>
                            <span className="text-[#EB2606]">
                              {min?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND"
                              })}
                            </span>{" "}
                            -{" "}
                            <span className="text-[#EB2606]">
                              {max?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND"
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="text-[#EB2606]">
                        {items?.productId?.price_product?.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND"
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favourite;
