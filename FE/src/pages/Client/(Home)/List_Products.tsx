import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import List_item from "../../../components/common/Client/_component/List_item";
import { Query_Limit_Items } from "../../../common/hooks/Products/Products";

const List_Products = () => {
  const { data, isLoading } = Query_Limit_Items(12);
  const propsData = {
    data: data,
    style: "lg:grid-cols-4 md:grid-cols-3"
  };

  return (
    <div className="py-16 text-center border-b overflow-hidden">
      {/* title */}
      <div className="text-center flex flex-col items-center">
        <span className="text-2xl font-semibold tracking-wide">
          Danh sách sản phẩm
        </span>
        <p className="opacity-80 text-sm my-4">
          Tìm một sản phẩm lý tưởng phù hợp với sở thích của bạn trong danh mục lựa chọn hệ thống treo tuyệt vời của chúng tôi.
        </p>
        <nav className="flex *:relative *:mx-6 justify-between *:after:content-[''] *:after:absolute *:after:h-[2px] *:after:bg-gray-800 *:after:bottom-[-20%] *:after:duration-500 *:font-medium *:after:rounded-lg">
          <button className="opacity-100 after:w-full after:left-0">
            Tất cả
          </button>
          <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">
            Áo
          </button>
          <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">
            Quần
          </button>
          <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">
            Mũ
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
            <div className="flex justify-center items-center">
              <img
                src="../../src/assets/Images/Products/no-data.png"
                alt="Không có sản phẩm"
              />
            </div>
          ) : (
            <div className="w-auto">
              <List_item dataProps={propsData} />
            </div>
          )}
          {/* view all */}
          <div className="flex items-center justify-center mx-auto h-[50px] w-[130px] rounded hover:bg-gray-100 duration-200 hover:text-black border border-black  bg-black cursor-pointer text-white">
            {" "}
            <Link onClick={ScrollTop} className="text-[15px] " to={"/shops"}>
              Xem tất cả
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default List_Products;
