import React, { useState } from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import { Spin, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Products from "../../../components/common/Items/Products";
import { IProduct } from "../../../common/interfaces/Product";

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
  const itemsPerPage = 8;

  // Hook lọc sản phẩm
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

  // Xử lý khi thay đổi trang
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

  return (
    <div>
      {productsResponse?.data?.length ? (
        <>
          <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
            {productsResponse.data.map((item: IProduct) => (
              <Products key={item._id} items={item} />
            ))}
          </div>
          {/* Phân trang */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={productsResponse.pagination.totalItems}
              onChange={handlePageChange}
              showSizeChanger={false} // Ẩn tùy chọn thay đổi số lượng items mỗi trang
            />
          </div>
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
