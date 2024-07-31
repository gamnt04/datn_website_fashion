import React, { useState, useEffect } from "react";
import { useFilteredProducts } from "../../../common/hooks/Products/useFilteredProducts";
import Products from "../../../components/common/Items/Products";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Products_Shop: React.FC<{ selectedCategoryId: string | null }> = ({
  selectedCategoryId,
}) => {
  const [page, setPage] = useState<number>(1);
  const [loadCount, setLoadCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const {
    data: productsData,
    isLoading,
    isError,
  } = useFilteredProducts(selectedCategoryId || "", page);

  useEffect(() => {
    if (productsData) {
      const docs = productsData.data?.docs || [];
      if (docs.length < 20) {
        setHasMore(false);
      }
      setLoadCount((prevCount) => prevCount + 1);
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
              <div className="flex justify-center mt-16">
                <div className="flex items-center mx-3 border border-gray-600 w-[40px] h-[40px] grid place-items-center duration-300 cursor-pointer">
                  <button
                    onClick={handlePrevPage}
                    className="opacity-50 hover:opacity-100"
                    disabled={page === 1}
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="opacity-50 hover:opacity-100"
                    disabled={!hasMore}
                  >
                    &#10095;
                  </button>
                </div>
              </div>
              {!hasMore && loadCount >= 2 && (
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
