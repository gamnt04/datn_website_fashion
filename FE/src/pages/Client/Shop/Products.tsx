import React from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilterProducts";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Products from "../../../components/common/Items/Products";

interface Products_ShopProps {
  cate_id: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  selectedColors: string[];
  selectedSizes: string[];
}

const Products_Shop: React.FC<Products_ShopProps> = ({
  cate_id,
  minPrice,
  maxPrice,
  selectedColors,
  selectedSizes,
}) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useFilteredProducts(
    cate_id,
    minPrice,
    maxPrice,
    selectedColors,
    selectedSizes
  );

  if (isLoading) return <div>Đang tải...</div>;

  // Kiểm tra xem error có phải là null không trước khi sử dụng
  if (isError && error) return <div>Lỗi: {error.message}</div>;

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : isError && !error ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src="../../src/assets/Images/Products/no-data.png"
            alt="Không có sản phẩm"
          />
        </div>
      ) : (
        <>
          {products?.data?.docs?.length ? (
            <>
              <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%] justify-between gap-y-6">
                {products.data.docs.map((item: any) => (
                  <Products key={item._id} items={item} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                {/* Phân trang đã bị tắt */}
                {/* <div className="flex items-center space-x-4">
                  <button
                    // Xử lý phân trang
                    className={`px-4 py-2 border rounded-md ${
                      page === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={page === 1}
                  >
                    &#10094; Trước
                  </button>
                  <span className="text-lg font-semibold">Trang {page}</span>
                  <button
                    // Xử lý phân trang
                    className={`px-4 py-2 border rounded-md ${
                      !hasMore
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={!hasMore}
                  >
                    Kế tiếp &#10095;
                  </button>
                </div> */}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <img
                src="../../src/assets/Images/Products/no-data.png"
                alt="Không có sản phẩm"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products_Shop;
