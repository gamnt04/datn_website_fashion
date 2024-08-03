import React, { useState, useEffect } from "react";
import { useProducts } from "../../../common/hooks/Products/useFilterProducts";
import Products from "../../../components/common/Items/Products";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Products_ShopProps {
  selectedCategoryId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
  sort: string;
}

const Products_Shop: React.FC<Products_ShopProps> = ({
  selectedCategoryId,
  minPrice,
  maxPrice,
  search,
  sort,
}) => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const {
    data: productsData,
    isLoading,
    isError,
  } = useProducts(selectedCategoryId, minPrice, maxPrice, search, sort, page);

  useEffect(() => {
    if (productsData) {
      const docs = productsData.data?.docs || [];
      setHasMore(docs.length === 20); 
    }
  }, [productsData]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src="../../src/assets/Images/Products/no-data.png"
            alt="Không có sản phẩm"
          />
        </div>
      ) : (
        <>
          {productsData?.data?.docs?.length ? (
            <>
              <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%] justify-between gap-y-6">
                {productsData.data.docs.map((item: any) => (
                  <Products key={item._id} items={item} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevPage}
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
                    onClick={handleNextPage}
                    className={`px-4 py-2 border rounded-md ${
                      !hasMore
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={!hasMore}
                  >
                    Kế tiếp &#10095;
                  </button>
                </div>
              </div>
              {!hasMore && (
                <div className="flex justify-center items-center h-screen">
                  <p>Không còn sản phẩm để hiển thị.</p>
                </div>
              )}
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
