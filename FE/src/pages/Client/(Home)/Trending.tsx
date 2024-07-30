import { Link } from "react-router-dom";
import Products from "../../../components/common/Items/Products";
import { useRef } from "react";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { IProduct } from "../../../common/interfaces/Product";

const Trending_Products = () => {
  const { data, isLoading } = Query_Products();
  const sizeListItems = useRef<HTMLDivElement | null>(null);
  const backItems = useRef<HTMLButtonElement | null>(null);
  const nextItems = useRef<HTMLButtonElement | null>(null);

  const handleNext = () => {
    if (sizeListItems.current) {
      const offsetWidthListItems = sizeListItems.current.offsetWidth || 0;
      const sizeGapColumn = parseFloat(
        window
          .getComputedStyle(sizeListItems.current)
          .getPropertyValue("column-gap")
          .replace("%", "")
      );
      sizeListItems.current.scrollLeft =
        sizeListItems.current.scrollLeft +
        offsetWidthListItems +
        (sizeGapColumn / 100) * offsetWidthListItems;
    }
  };

  const handlePrevious = () => {
    if (sizeListItems.current) {
      const offsetWidthListItems = sizeListItems.current.offsetWidth || 0;
      const sizeGapColumn = parseFloat(
        window
          .getComputedStyle(sizeListItems.current)
          .getPropertyValue("column-gap")
          .replace("%", "")
      );
      sizeListItems.current.scrollLeft =
        sizeListItems.current.scrollLeft -
        offsetWidthListItems -
        (sizeGapColumn / 100) * offsetWidthListItems;
    }
  };

  return (
    <div className="py-16 overflow-hidden text-center border-b">
      {/* title */}
      <div className="flex flex-col items-center text-center">
        <span className="text-4xl font-medium tracking-wide">
          Trending Products
        </span>
        <p className="my-10 text-sm opacity-80">
          Find a bright ideal to suit your taste width our great selection of
          suspension.
        </p>
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
                className="overflow-x-scroll py-4 hidden_scroll-x_trendingproducts scroll-smooth listProductsTrendingChild grid mt-10 grid-flow-col lg:gap-x-[2%] gap-x-[2.66%] mb:auto-cols-[48%] md:auto-cols-[33%] lg:auto-cols-[15%]"
              >
                {data?.map((item: IProduct) => {
                  return <Products key={item._id} items={item} />;
                })}
              </div>
              {/* back, next page */}
              <div className="flex items-center *:mx-8 justify-center mt-[20px] *:duration-300 *:text-lg">
                <button
                  ref={backItems}
                  onClick={handlePrevious}
                  className="opacity-50 cursor-drop"
                >
                  &#10094;
                </button>
                <button
                  ref={nextItems}
                  onClick={handleNext}
                  className="hover:scale-[1.3]"
                >
                  &#10095;
                </button>
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

export default Trending_Products;
