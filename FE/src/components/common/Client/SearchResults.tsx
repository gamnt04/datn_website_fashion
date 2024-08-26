/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MenuShop from "../../../pages/Client/Shop/MenuShop";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import Products from "../Items/Products";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: any = searchParams.get("keyword");

  // Thêm các state mới cho việc lọc
  const [cate_id, setCategoryId] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<any>("");
  const itemsPerPage = 11; // Số lượng sản phẩm mỗi trang

  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useFilteredProducts(
    query,
    cate_id,
    priceRanges,
    selectedColors,
    selectedSizes,
    currentPage,
    itemsPerPage,
    sortOption
  );
  console.log(`results`, results);

  const totalPages = results ? Math.ceil(results.data.length / 10) : 1;
  const hasMore = currentPage < totalPages;
  // Hàm xử lý cho MenuShop
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

  // Kiểm tra loading và error trước
  if (isLoading)
    return (
      <div>
        <LoadingOutlined />
      </div>
    );
  if (isError) return <div>Có lỗi xảy ra: {error?.message}</div>;

  // Kiểm tra xem có kết quả không
  const hasResults = results && results.data && results.data.length > 0;

  return (
    <div className="lg:mt-[40px] mt-[60px]">
      <div className="xl:w-[1440px] w-[95vw] mx-auto">
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          <Link to={`/`} className="text-gray-500 hover:text-black">
            Trang chủ
          </Link>
          <span className="mx-1 text-gray-500">&#10148;</span>
          <Link to={`/shops`} className="text-gray-500 hover:text-black">
            Sản phẩm
          </Link>
          <span className="mx-1 text-gray-500">&#10148;</span> Kết quả tìm kiếm
          cho "{query}"
        </div>

        <MenuShop
          onCategorySelect={handleCategorySelect}
          onPriceChange={handlePriceChange}
          setSearch={() => {}}
          setSort={setSortOption}
          sortOption={sortOption}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          resetColorFilter={resetColorFilter}
          onColorChange={handleColorChange}
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={handleSizeChange}
        />

        {hasResults ? (
          <>
            <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
              {results?.data
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((product: any) => (
                  <Products key={product._id} items={product} />
                ))}
            </div>

            {results.data.length > 10 && (
              <div className="flex flex-col items-center mt-8">
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
            )}
          </>
        ) : (
          <Empty className="my-5" description="Không có sản phẩm nào" />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
