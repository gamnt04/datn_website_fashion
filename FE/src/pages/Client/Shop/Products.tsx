// src/components/Products_Shop.tsx
import React, { useState } from "react";
import { Query_Products } from "../../../common/hooks/Products/Products";
import Products from "../../../components/common/Items/Products";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Products_ShopProps {
  categoryId?: string; // Thay đổi từ `string | null` thành `string | undefined`
}

const Products_Shop: React.FC<Products_ShopProps> = ({ categoryId }) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = Query_Products(categoryId, page);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-screen">
          <p>Đã xảy ra lỗi khi tải sản phẩm</p>
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <>
              <div className="grid gap-y-6 mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%]">
                {data.map((item: any) => (
                  <Products key={item._id} items={item} />
                ))}
              </div>
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="opacity-50 hover:opacity-100 disabled:opacity-25"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="opacity-50 hover:opacity-100"
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <img
                src="../../../assets/Images/Products/no-data.png"
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
