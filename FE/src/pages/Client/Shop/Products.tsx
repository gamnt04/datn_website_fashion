import React, { useState, useEffect } from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import { Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Products from "../../../components/common/Items/Products";
import { IProduct } from "../../../common/interfaces/Product";
import { useLocation, useNavigate } from "react-router-dom";

interface Products_ShopProps {
  query: string;
  cate_id: string[];
  price_ranges: { min: number; max: number }[];
  selectedSizes: string[];
  selectedColors: string[];
  sortOption: string;
}

const Products_Shop: React.FC<Products_ShopProps> = ({
  query,
  cate_id,
  price_ranges,
  selectedSizes,
  selectedColors,
  sortOption,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: productsResponse,
    isLoading,
    isError,
    error,
  } = useFilteredProducts(
    query,
    cate_id,
    price_ranges,
    selectedColors,
    selectedSizes,
    currentPage,
    itemsPerPage,
    sortOption
  );

  // Handle URL updates
  const updateURL = () => {
    const urlParams = new URLSearchParams(location.search);

    if (query) urlParams.set("keyword", query);
    urlParams.set("page", currentPage.toString());
    if (sortOption) urlParams.set("sort", sortOption);
    if (cate_id.length) urlParams.set("cate_id", cate_id.join(","));
    if (price_ranges.length)
      urlParams.set("price_ranges", JSON.stringify(price_ranges));
    if (selectedColors.length) urlParams.set("color", selectedColors.join(","));
    if (selectedSizes.length)
      urlParams.set("name_size", selectedSizes.join(","));

    navigate({ search: urlParams.toString() });
  };

  // Get params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const page = params.get("page");
    const cate_id_from_url = params.get("cate_id")?.split(",") || [];
    const price_ranges_from_url = params.get("price_ranges")
      ? JSON.parse(params.get("price_ranges") || "[]")
      : [];
    const name_size_from_url = params.get("name_size")?.split(",") || [];
    const color_from_url = params.get("color")?.split(",") || [];
    const sort_from_url = params.get("sort") || "";

    if (page) setCurrentPage(Number(page));

    // Update state with URL params
    updateURL(); // Ensure the URL gets updated on first render as well
  }, [location.search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  if (!productsResponse?.data || productsResponse.data.length === 0) {
    return (
      <div className="flex justify-center items-center text-lg py-4">
        <img
          src="../../src/assets/Images/Products/no-data.png"
          alt="Không có sản phẩm"
        />
      </div>
    );
  }

  const totalItems = productsResponse.pagination?.totalItems || 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
        {productsResponse.data.map((item: IProduct) => (
          <Products key={item._id} items={item} />
        ))}
      </div>

      {/* Phân trang */}
      {totalItems > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Products_Shop;
