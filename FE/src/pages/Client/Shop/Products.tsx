// import img_product from "../../../assets/Images/Products/product_1.png";
import { useState } from "react";
import { Query_Products } from "../../../common/hooks/Products/Products";
import Products from "../../../components/common/Items/Products";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Products_Shop = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = Query_Products('', page);
  function dow() {
    (page > 1) && setPage(page - 1)
  }
  function up() {
    alert('1222')
    setPage(page + 1)
  }

  return (
    <div className="py-10">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <>
              <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%] justify-between gap-y-6">
                {data.map((item: any) => (
                  <Products key={item._id} items={item} />
                ))}
              </div>
              <div className="flex justify-center mt-16">
                <div className="flex items-center *:mx-3 *:border *:border-gray-600 *:w-[40px] *:h-[40px] *:grid *:place-items-center *:duration-300 *:cursor-pointer">
                  <button onClick={dow} className="opacity-50 hover:opacity-100">&#10094;</button>
                  <button onClick={up} className="opacity-50 hover:opacity-100">&#10095;</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <img src="../../src/assets/Images/Products/no-data.png" alt="Không có sản phẩm" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products_Shop;
