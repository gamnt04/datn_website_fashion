import Products from "../../../components/common/Items/Products";
import img_product from '../../../assets/Images/Products/product_1.png';
import { IProduct } from "../../../common/interfaces/Product";
// import { HeartIcon } from "../../../resources/svg/Icon/Icon";
// import DescriptionProduct from "./[DescriptionProduct]";
// import ImageProducts from "./ImageProducts";

const ProductRelated = ({product} : IProduct) => {
  console.log(product);
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

        {/* EMAIL */}
        <div className="py-[100px] container mx-auto max-w-[1200px]  text-center ">
          <h2 className="text-[48px] font-normal pb-[15px]">Get in touch</h2>
          <p className="text-[18px] text-[#ABABAB] pb-[30px]">
            Subcrible for latest stories and promotions (35% save)
          </p>
          <div className="pb-[30px]">
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              className="w-[640px] h-[46px] border-2 pl-[20px] "
            />
            <button className="btn-submit ml-[20px] w-[122px] h-[46px] bg-[#1C1C1C] text-white">
              Subscribe
            </button>
          </div>
          <div className="">
            <ul className="flex justify-center flex space-x-5">
              <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
                <a href="" className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ABABAB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </li>
              <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
                <a href="" className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ABABAB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              </li>
              <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
                <a href="" className="icon flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ABABAB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </li>
              <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ABABAB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="py-[30px]">
            <p className="text-[#ABABAB]">Don’t worry. We won't spam.</p>
          </div>
        </div>
        {/* END EMAIL */}
      </div>
    </div>
  );
};

export default ProductRelated;
