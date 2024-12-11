import React, { useState, useEffect } from "react";
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
  const itemsPerPage = 12;

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

  // Đặt lại trang khi bộ lọc thay đổi
  useEffect(() => {
    setCurrentPage(1); // Reset về trang 1 mỗi khi bộ lọc thay đổi
  }, [query, cate_id, price_ranges, selectedSizes, selectedColors, sortOption]);

  // Hiển thị khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  // Hiển thị khi có lỗi
  if (isError && error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  // Kiểm tra xem có dữ liệu không
  if (!productsResponse?.data || productsResponse.data.length === 0) {
    return (
      <div className="flex justify-center items-center text-lg py-4">
        Không có sản phẩm nào
      </div>
    );
  }

  // Xử lý phân trang đúng cách
  const totalItems = productsResponse.pagination?.totalItems || 0;
  const currentItems = productsResponse.data.length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
        {productsResponse.data.map((item: IProduct) => (
          <Products key={item._id} items={item} />
        ))}
      </div>

      {/* Phân trang */}
      {totalItems > currentItems && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger={false} // Ẩn tùy chọn thay đổi số lượng items mỗi trang
          />
        </div>
      )}
    </div>
  );
};

export default Products_Shop;
