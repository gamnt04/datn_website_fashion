import { Link } from "react-router-dom";
import Products from "../../../components/common/Items/Products";
import { useRef } from "react";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { IProduct } from "../../../common/interfaces/Product";

const AllProducts = () => {
  const { data, isLoading } = Query_Products();
  const sizeListItems = useRef<HTMLDivElement | null>(null);

  return (
    <div className="py-16 overflow-hidden text-center border-b">
      {/* title */}
      <div className="flex flex-col items-center text-center">
        <span className="text-4xl font-medium tracking-wide">All Products</span>
        <p className="my-10 text-sm opacity-80">
          Find a bright ideal to suit your taste width our great selection of
          suspension.
        </p>
        <nav className="flex *:relative *:mx-6 justify-between *:after:content-[''] *:after:absolute *:after:h-[2px] *:after:bg-orange-500 *:after:bottom-[-20%] *:after:duration-500 *:font-medium *:after:rounded-lg">
          <button className="opacity-100 after:w-full after:left-0">
            Living
          </button>
          <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">
            Furniture
          </button>
          <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">
            Accessories
          </button>
          <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">
            Tech
          </button>
        </nav>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          {/* products */}
          {data?.length === 0 ? (
            <div className="flex items-center justify-center">
              <img
                src="../../src/assets/Images/Products/no-data.png"
                alt="Không có sản phẩm"
              />
            </div>
          ) : (
            <div className="mb-[50px] w-auto">
              <div
                ref={sizeListItems}
                className=" gap-20 py-4 grid mt-10 grid-cols-5 lg:gap-x-[2%] gap-x-[2.66%] mb:auto-cols-[48%] md:auto-cols-[33%] lg:auto-cols-[15%]"
              >
                {data?.map((item: IProduct) => {
                  return <Products key={item._id} items={item} />;
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* view all */}
      <div className="duration-300 hover:scale-105">
        <Link
          onClick={ScrollTop}
          className="px-10 py-2 text-white bg-black border border-none rounded-md cursor-pointer"
          to={"/shops"}
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
