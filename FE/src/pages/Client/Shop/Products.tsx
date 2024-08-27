/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Products from "../../../components/common/Items/Products";
import { useLocation } from "react-router-dom";

interface Products_ShopProps {
  query: string;
  cate_id: string[];
  priceRanges: { min: number; max: number }[];
  selectedColors: string[];
  selectedSizes: string[];
  sortOption: string;
}

const Products_Shop: React.FC<Products_ShopProps> = ({
  query,
  priceRanges,
  selectedColors,
  selectedSizes,
  sortOption,
}) => {
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 11; // Số lượng sản phẩm mỗi trang
  const [cate_id, setCategoryId] = useState<string[]>([]);
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const categoryParam = queryParams.get("category");
    if (categoryParam) {
      setCategoryId(categoryParam.split(","));
    } else {
      // Nếu không có category, hiển thị tất cả sản phẩm
      setCategoryId([]);
    }
  }, [search]);
  //const [query] = useState();
  const {
    data: products,
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

  const totalItems = products?.pagination?.totalItems || 0;
  const totalPages = products?.pagination?.totalPages || 1;
  const hasMore = currentPage < totalPages;

  return (
    <div>
      {products?.data?.length ? (
        <>
          <div className="grid grid-cols-2 gap-6 mt-4 lg:grid-cols-4">
            {products.data.map((item: any) => (
              <Products key={item._id} items={item} />
            ))}
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="flex items-center mb-4 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={currentPage === 1}
              >
                &#10094; Trang trước
              </button>
              <span className="text-lg font-semibold">Trang {currentPage}</span>
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
        <div className="flex items-center justify-center h-screen">
          <img src="/assets/Images/Products/no-data.png" alt="No products" />
        </div>
      )}
    </div>
  );
};

export default Products_Shop;
