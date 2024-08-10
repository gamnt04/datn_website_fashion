import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { IProduct } from "../../../common/interfaces/Product";
import MenuShop from "../../../pages/Client/Shop/MenuShop";
import { Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
  const [cate_id, setCategoryId] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleCategorySelect = (id: string[]) => {
    setCategoryId(id); // Cập nhật toàn bộ mảng ID
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

  if (isLoading)
    return (
      <div>
        <LoadingOutlined />
      </div>
    );
  if (error) return <div>Có lỗi xảy ra: {error.message}</div>;

  return (
    <div className="lg:mt-[40px] mt-[60px]">
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

      <div>
        <h1 className="flex justify-center">Kết quả tìm kiếm cho: {query}</h1>
        {results && results.length > 0 ? (
          <div className="grid grid-cols-4 gap-6 mt-10 ">
            {results.map((product: IProduct) => (
              <div className="flex justify-center" key={product._id}>
                <Link
                  to={`/shops/detail_product/${product._id}`}
                  className="h-full cursor-pointer"
                >
                  <img
                    className="h-64 w-72"
                    loading="lazy"
                    src={product.image_product}
                    alt={product.name_product}
                  />
                  <p>{product.name_product}</p>
                  <p className="font-semibold text-red-500 text-md">
                    {product.price_product.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
