import React, { useState, useEffect } from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Products from "../../../components/common/Items/Products";
import { IProduct } from "../../../common/interfaces/Product";

interface Products_ShopProps {
  query: string; // Thêm query vào props
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
  const itemsPerPage = 16;

  // Hook lọc sản phẩm
  const {
    data: productsResponse,
    isLoading,
    isError,
    error,
  } = useFilteredProducts(
    cate_id,
    price_ranges,
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

  const totalItems = productsResponse?.pagination?.totalItems || 0;
  const totalPages = productsResponse?.pagination?.totalPages || 1;
  const hasMore = currentPage < totalPages;

  return (
    <div>
      {productsResponse?.data?.length ? (
        <>
          <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
            {productsResponse.data.map((item: IProduct) => (
              <Products key={item._id} items={item} />
            ))}
          </div>
          {totalItems > itemsPerPage && (
            <div className="flex flex-col items-center my-4">
              <div className="flex items-center mb-4 space-x-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={`px-4 py-2 border rounded-md ${
                    !hasMore
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                  disabled={!hasMore}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center text-lg py-4">
          Không có sản phẩm nào
        </div>
      )}
    </div>
  );
};

export default Products_Shop;
