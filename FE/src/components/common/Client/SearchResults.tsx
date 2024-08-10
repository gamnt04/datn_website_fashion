import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { IProduct } from "../../../common/interfaces/Product";
import MenuShop from "../../../pages/Client/Shop/MenuShop";
import { Empty, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProductModal from "../../../pages/Client/Preview/ProductModal";
import { HeartIcon } from "lucide-react";
import { HeartIconRed } from "../../../resources/svg/Icon/Icon";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { useListFavouriteProducts } from "../../../common/hooks/FavoriteProducts/FavoriteProduct";
import { Mutation_FavouriteProduct } from "../../../common/hooks/FavoriteProducts/mutation_FavouriteProducts";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";


const fetchSearchResults = async (query: IProduct) => {
  const { data } = await instance.get("/products_all", {
    params: { _search: query },
  });
  return data.products;
};


const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });


  //p tim chung
  const [user] = useLocalStorage("user", {});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const account = user?.user;
  const userId = account?._id;
  const { data: FavoriteData } = useListFavouriteProducts(userId);
  const { mutate: AddFavouriteProduct } = Mutation_FavouriteProduct("ADD");
  const { mutate: RemoveFavouriteProduct } =
    Mutation_FavouriteProduct("REMOVE");


  const handlePreview = async (id: any) => {
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


   //p lọc trung
  const [cate_id, setCategoryId] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);


  const handleCategorySelect = (id: string[]) => {
    setCategoryId(id);
  };


  const handlePriceChange = (priceRanges: { min: number; max: number }[]) => {
    setPriceRanges(priceRanges);
  };


  const handleColorChange = (colors: string[]) => setSelectedColors(colors);


  const handleSizeChange = (sizes: string[]) => setSelectedSizes(sizes);


  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };


  const resetColorFilter = () => setSelectedColors([]);


  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };


  const resetSizeFilter = () => setSelectedSizes([]);


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = results ? Math.ceil(results.length / 10) : 1;
  const hasMore = currentPage < totalPages;


  if (isLoading)
    return (
      <div>
        <LoadingOutlined />
      </div>
    );
  if (error) return <div>Có lỗi xảy ra: {error.message}</div>;


  return (
    <div className="lg:mt-[40px] mt-[60px]">
      <div className="xl:w-[1440px] w-[95vw] mx-auto">
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          Trang chủ &#10148; Sản phẩm &#10148; Tìm kiếm
        </div>
        <MenuShop
          onCategorySelect={handleCategorySelect}
          onPriceChange={handlePriceChange}
          setSearch={() => {}}
          setSort={() => {}}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          resetColorFilter={resetColorFilter}
          onColorChange={handleColorChange}
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={handleSizeChange}
        />


        <h1 className="flex justify-center">Kết quả tìm kiếm cho: {query}</h1>
        {results && results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 mt-4 lg:grid-cols-4">
              {results
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((product: IProduct) => (
                  <div
                    className="flex flex-col justify-between w-full gap-y-5"
                    key={product._id}
                  >
                    <div className="relative w-full group">
                      <Link
                        onClick={ScrollTop}
                        to={`/shops/${product._id}`}
                        className="h-full cursor-pointer"
                      >
                        <img
                          className="w-full h-[250px] lg:h-[400px] object-cover"
                          loading="lazy"
                          src={product.image_product}
                          alt={product.name_product}
                        />
                      </Link>
                      <div className="absolute flex flex-col bg-white rounded top-0 pt-1 translate-y-[-100%] right-0 group-hover:translate-y-0 duration-200">
                        <div className="absolute top-0 right-0 flex flex-col p-1 rounded">
                          {account ? (
                            checkFavourite(product?._id) ? (
                              <button
                                className="p-2 border-none rounded"
                                onClick={() =>
                                  handleRemoveFromFavorites(product?._id)
                                }
                              >
                                <HeartIconRed />
                              </button>
                            ) : (
                              <button
                                className="p-2 border-none rounded"
                                onClick={() =>
                                  handleAddToFavorites(product?._id)
                                }
                              >
                                <HeartIcon />
                              </button>
                            )
                          ) : (
                            <button
                              className="p-2 border-none rounded"
                              onClick={() => handleAddToFavorites(product?._id)}
                            >
                              <HeartIcon />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center px-4 py-4 product-center gap-y-2">
                        <Link
                          onClick={ScrollTop}
                          to={`/shops/${product?._id}`}
                          className="text-md text-center font-bold lg:text-[16px] hover:text-black line-clamp-2"
                        >
                          {product?.name_product.length > 15
                            ? product?.name_product.slice(0, 50) + "..."
                            : product?.name_product}
                        </Link>
                        <p className="font-normal text-[16px]">
                          {product?.price_product?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>


                      {modalOpen && selectedProduct && (
                        <ProductModal
                          product={selectedProduct}
                          onClose={handleCloseModal}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col items-center my-8">
              <div className="flex items-center mb-4 space-x-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={currentPage === 1}
                >
                  &#10094; Trang trước
                </button>
                <span className="text-lg font-semibold">
                  Trang {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    !hasMore
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={!hasMore}
                >
                  Trang tiếp theo &#10095;
                </button>
              </div>
              <div className="flex flex-wrap items-center space-x-2">
                {totalPages > 1 &&
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
              </div>
            </div>
          </>
        ) : (
          <Empty description="Không tìm thấy sản phẩm nào" />
        )}
      </div>
    </div>
  );
};


export default SearchResults;





