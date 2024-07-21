import { useEffect, useState } from "react";
import React, { useState } from "react";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { IProduct } from "../../../common/interfaces/Product";
import { Button } from "../../../components/ui/button";
import { Dow, Up } from "../../../resources/svg/Icon/Icon";
import { Convert_Color } from "../../../_lib/Config/Config_Color";

interface ImageProductProp {
  product: IProduct;
}
const InforProduct: React.FC<InforProductProp> = ({ dataProps }: any) => {
  const [color, setColor] = useState();
  const [arr_size, setArr_Size] = useState();
  const [size, setSize] = useState();
  const [quantity_attr, setQuantity_attr] = useState();
  const dataItem = dataProps?.product;
  const dataAttr = dataProps?.attr;
  const { name_product, price_product, _id, stock } = dataItem;
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  const { mutate } = Mutation_Cart("ADD");
  const addCart = (id?: string | number) => {

const InforProduct: React.FC<ImageProductProp> = ({ product }) => {
  const { name_product, price_product, _id, quantity_product, sizes } = product;
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  const { mutate } = Mutation_Cart("ADD");

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price_product);

  const handleIncreaseQuantity = () => {
    if (quantity < quantity_product) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * price_product);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * price_product);
    }
  };

  const addCart = (id: string) => {
    const item = {
      userId: account,
      productId: id,
      quantity: quantity
    };
    mutate(item);
  };

  useEffect(() => {
    if(!dataAttr) {
      setQuantity_attr(stock)
    }
  }, [dataAttr])


  function handle_atrtribute(item?: any, action?: any) {
    switch (action) {
      case 'Color':
        setColor(item);
        for (let i of dataAttr?.values) {
          for (let k of i.size) {
            if (!k?.name_size || k?.name_size == '') {
              i?.color == item && setQuantity_attr(k?.stock_attribute)
            }
            else {
              setArr_Size(i?.size)
            }
          }
        }
        return;
      case 'Size':
        setSize(item);
        for (let i of dataAttr?.values) {
          for (let k of i.size) {
            k?.name_size == item && setQuantity_attr(k?.stock_attribute)
          }
        }
        return;
      default: return;
    }
  }

  return (
    <div className="h-full w-full *:w-full lg:mt-2 mb:mt-5">
      <div className="flex flex-col lg:gap-y-2">
        {/* row 1 */}
        <div className="lg:pb-5 flex flex-col lg:gap-y-2">
          <span className="text-gray-700 font-bold lg:text-base mb:text-sm">
            {name_product}
          </span>
          <strong className="lg:text-2xl lg:mt-0 mb:mt-3.5 mb:text-xl lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]"></strong>
          <div className="flex flex-col gap-y-2 justify-between">
            <section className="lg:w-[163px] mb:w-[157px] mb:mt-[8px] lg:mt-0 h-[21px] *:lg:text-sm *:mb:text-xs flex justify-between items-start">
              <div className="flex gap-x-2">
                <strong>135</strong>
                <span className="text-[#C8C9CB]">Reviews</span>
              </div>
            </section>
            <div className="flex items-center gap-x-2 items-end">
              <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">
                <del className="font-light lg:text-sm mb:text-sm text-[#9D9EA2]">
                  200.00 đ
                </del>
                {totalPrice} đ
              </span>
            </div>
          </div>
        </div>
        {/* row 2 */}
        {
          dataAttr && (<>
            <div>
              <span className="text-lg lg:mt-[1px] mb:mt-3.5 lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
                Color
              </span>
              <div className="flex items-center gap-x-4 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium *:h-8 *:w-8 *:rounded-[50%] *:border *:duration-300">
                {
                  dataAttr?.values?.map((item: any) => (
                    <button onClick={() => handle_atrtribute(item?.color, 'Color')} className={`${Convert_Color(item?.color)} ${color == item?.color ? 'after:block' : 'after:hidden'} hover:scale-110 after:absolute after:w-4 after:h-2 after:border-l-2 after:border-b-2 after:border-white after:rotate-[-45deg] grid place-items-center`}></button>
                  ))
                }
              </div>
            </div>
            {/* row 4   */}
            {
              (arr_size) && (
                <div>
                  <span className="text-lg lg:mt-[1px] mb:mt-3.5 lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
                    Size
                  </span>
                  <div className="flex items-center gap-x-4 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium *:px-3 *:py-1 *:rounded *:border *:border-black *:duration-200">
                    {
                      arr_size?.map((item: any) => (
                        <button onClick={() => handle_atrtribute(item?.name_size, 'Size')} className={`${size == item?.name_size && 'bg-black text-white'} hover:bg-black hover:text-white grid place-items-center`}>{item?.name_size}</button>
                      ))
                    }
                  </div>
                </div>
              )
            }
          </>)
        }

        <div className="flex flex-col gap-y-1 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium">
          <span className="text-sm lg:text-base tracking-[1px]">
            Mô tả ngắn
          </span>
          <p className="text-sm lg:text-base text-gray-600">
            Ahihi day la mo ta ngan cua san pham demo ahihihihihihihihihihih
          </p>
        </div>
        {/* row 3 */}
        <div>
          <span className="text-lg lg:mt-[1px] mb:mt-3.5 lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
            Size
          </span>
          <div className="flex items-center gap-x-4 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium *:px-4 *:py-2 *:rounded *:border *:duration-300">
            {sizes?.map((size, index) => (
              <button className="hover:bg-black hover:text-white" key={index}>
                {size}
              </button>
            ))}
          </div>
        </div>
        {/* row 4 */}
        <div>
          <span className="text-lg lg:mt-[1px] mb:mt-3.5 lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
            Color
          </span>
          <div className="flex items-center gap-x-4 lg:mt-[2px] mt-[3px] lg:pb-0 mb:pb-[21px] font-medium *:h-8 *:w-8 *:rounded-[50%] *:relative *:border *:duration-300">
            <button className="bg-red-500 hover:scale-110 after:absolute focus:after:w-4 focus:after:h-2 focus:after:border-l-2 focus:after:border-b-2 after:border-white after:rotate-[-45deg] grid place-items-center"></button>
            <button className="bg-blue-500 hover:scale-110 after:absolute after:border-0 focus:after:w-4 focus:after:h-2 focus:after:border-l-2 focus:after:border-b-2 after:border-white after:rotate-[-45deg] grid place-items-center"></button>
            <button className="bg-black hover:scale-110 after:absolute after:border-0 focus:after:w-4 focus:after:h-2 focus:after:border-l-2 focus:after:border-b-2 after:border-white after:rotate-[-45deg] grid place-items-center"></button>
          </div>
        </div>
        {/* row 5 */}
        <div className="py-5 *:w-full rounded-xl lg:-mt-5 -mt-1">
          {/* quantity */}
          <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] gap-x-8 lg:items-center mb:items-start">
            {/* up , dow quantity */}
            <div className="border lg:py-2.5 lg:pr-6  mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex flex items-center gap-x-3 rounded-xl">
              <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                <button>
                  <Dow />
                </button>
                <input className="bg-[#F4F4F4] text-center rounded" value={2} />
                <button>
                  <Up />
            {/* up, down quantity */}
            <div className="border lg:py-2.5 lg:pr-6  mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
              <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                <button onClick={handleDecreaseQuantity}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-minus"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <input className="bg-[#F4F4F4]" value={quantity} readOnly />
                <button onClick={handleIncreaseQuantity}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
              <span className="text-gray-800 lg:tracking-[0.5px] border-l pl-4 border-black">
                Còn lại {quantity_attr} sản phẩm
              </span>
            </div>
          </div>
          <div className="flex items-center mb-4 gap-x-2 font-medium lg:text-xl lg:tracking-[0.7px] mb:text-base">
            <span>Tạm tính :</span>
            <span className="text-[#EB2606]">
              242.00 đ
            <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">
              {totalPrice} đ
            </span>
          </div>

          <div className="flex items-center gap-x-5 font-medium lg:text-base mb:text-sm *:rounded *:duration-300">
            {/* add cart */}
            <Button className="hover:bg-black hover:text-white" onClick={() => addCart(_id)}>Thêm vào giỏ</Button>
            {/* add cart */}
            <Button className="hover:bg-black hover:text-white">Thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforProduct;
