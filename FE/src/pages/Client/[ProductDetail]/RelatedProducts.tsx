import Products from "../../../components/common/Items/Products";
import img_product from '../../../assets/Images/Products/product_1.png';
import { IProduct } from "../../../common/interfaces/Product";
// import { HeartIcon } from "../../../resources/svg/Icon/Icon";
// import DescriptionProduct from "./[DescriptionProduct]";
// import ImageProducts from "./ImageProducts";

const ProductRelated = ({ product }: IProduct) => {
  const a: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full mt-[10px]">
      {/* TAG  */}
      {/* <div className="flex items-center bg-gray-100 h-20 p-4">
        <ul className="flex gap-2 container w-full">
          <li className="text-red-500">
            <a href="#">Home </a>
          </li>
          <li> / </li>
          <li>
            <a href="#">Cart</a>
          </li>
        </ul>
      </div> */}
      {/* END TAG */}

      <div className="xl:w-[1440px] mb:w-[95%] mb:mx-[2.5%] md:mx-auto *:w-full">

        {/* <div className="">
        CONTENT DETAIL
        <div>
          INFOR DETAIL P

          <div className="grid grid-cols-2 pt-[40px]">
            INFOR DETAIP LEFT
            <ImageProducts/>
            end INFOR DETAIP LEFT

            INFOR DETAIP RIGHT
            <div className="bg-[#fff] pl-4 md:pl-10">
                <p className="text-[12px]">AFTEROOM</p>
                <h2 className="mb:text-base md:text-4xl">Afteroom Lounge</h2>
              <div className="pt-3 md:pt-5">
                <h3 className="text-lg md:text-3xl">9.215.000 VND</h3>
                <p className=" pt-5">Color</p>
                <div className="flex space-x-2 pt-2 md:pt-[20px] *:rounded">
                  <button className="w-20 h-10 text-[14px]  border-black border text-black bg-[#fff] text-center hover:border-black">
                    Black
                  </button>
                  <button className="w-20 h-10 text-[14px] border-[#F6F6F6] border text-black bg-[#fff] text-center hover:border-black">
                    Black
                  </button>
                  <button className="w-20 h-10 text-[14px] border-[#F6F6F6] border text-black bg-[#fff] text-center hover:border-black">
                    Black
                  </button>
                </div>

                <div className="pt-5">
                  <div className="">
                    <p className="text-black underline">Size guide</p>
                    <hr className="border-dashed border-black w-full mt-[20px]" />
                    <p className="pt-[20px]">Quantity</p>
                    <div className="flex pt-[20px] *:rounded">
                      <div className="grid grid-cols-3 border-[1px] border-black w-[200px] h-10 md:h-14">
                        <button className="flex justify-center items-center">
                          -
                        </button>
                        <input
                          type="text"
                          placeholder="1"
                          className="text-center"
                        />
                        <button className="flex justify-center items-center">
                          +
                        </button>
                      </div>
                      <button className="justify-center items-center pl-5 *:hover:scale-105 *:duration-200">
                        <HeartIcon/>
                      </button>
                    </div>
                    <div className="grid grid-cols-[49%_49%] justify-between *:duration-200 space-x-2 pt-[20px] *:md:h-14 *:h-10 *:md:text-base *:text-sm *:rounded">
                      <button className="bg-black text-[#fff] hover:scale-105">
                        Add to cart
                      </button>
                      <button className="bg-black text-[#fff] hover:scale-105">
                        Buy it now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-14">
                  <hr className="border-dashed border-black w-full  " />
                  <div className="flex space-x-2 pt-[30px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-share"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" x2="12" y1="2" y2="15" />
                    </svg>
                    <p className="text-[14px]">Share</p>
                  </div>
                </div>
              </div>
            </div>
            END INFOR DETAIP RIGHT
          </div>

          END INFOR DETAIL P
        </div>
        END CONTENT DETAIL

        DESCRIPION
        <div>
          <DescriptionProduct />
        </div>
      </div> */}

        <hr />
        {/*END  ACTION */}

        {/* RECOMMEND */}
        <div className="pt-[60px]">
          <h2 className="text-xl font-semibold">You may also like</h2>
          {/* chu y sau nay phan trang limit item = 20 */}
          <div className="grid xl:grid-cols-5 md:grid-cols-3 mb:grid-cols-2 md:gap-8 gap-3 mt-5 md:auto-rows-[400px] mb:auto-rows-[250px]">
            {/* INFOR P */}
            {/* --  */}
            {a?.map((i) =>
              (<Products data={{ img_product, i }} />)
            )}
            {/* -- */}

            {/* END INFOR P */}
          </div>
        </div>
        {/* END RECOMMEND */}
      </div>
    </div>
  );
};

export default ProductRelated;
