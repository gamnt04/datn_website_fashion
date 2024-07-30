import { Link, useNavigate } from "react-router-dom";
import { IOrder } from "../../../../common/interfaces/Orders";
import { Car, TotalPrice } from "../../../../components/common/Client/_component/Icons";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { Mutation_Cart } from "../../../../common/hooks/Cart/mutation_Carts";
import { Button, Popconfirm } from "antd";


const Complete = ({ dataProps }: any) => {
  const navi = useNavigate();
  const [user] = useLocalStorage("user", {});
  const account = user?.user;
  const { mutate } = Mutation_Cart("ADD");
  const addCart = (_id?: string | number) => {
    if (account) {
      dataProps.map((i: any) => {
        if (i?.items) {
          i?.items.map((j: any) => {
            if (j.productId) {
              mutate({
                userId: account?._id,
                productId: j.productId?._id,
                color: j.color_item,
                size: j.name_size,
                quantity: j.quantity,
                price: j.productId?.price_product,
                image: j.productId?.image_product,
                name: j.productId?.name_product,
                _id: _id
              });
            }
          })
        }
      })
    }
    else {
      navi('/login')
    }
  };
  return (
    <>
      {!dataProps || dataProps.length === 0 ? (

        <div className="flex justify-center items-center">
          <img src="../../src/assets/Images/Products/no-data.png" alt="Không có sản phẩm" />
        </div>
      ) : (
        <div>
          {dataProps.map((item: IOrder) => (
            <div className=" my-4 px-2">

              <div className="flex gap-2 py-5 border-b-2 justify-between">
                <Link to={`/allorder/order/${item._id}/detail`} className="py-2 px-4 bg-[#222222] text-white text-[12px] lg:text-sm rounded">
                  Xem ngay
                </Link>
                <div className="flex">
                  <a href="" className="flex items-center">
                    <Car />
                    {Number(item.status) === 4 && (
                      <span className="text-[12px] lg:text-sm pl-[10px] text-[#26aa99]">
                        Đã giao hàng
                      </span>
                    )}
                  </a>
                </div>
              </div>

              <div className="">
                {item.items.map((product) => {
                  return (<div className="flex flex-row gap-4 py-[12px] w-full">
                    <div className="basis-24">
                      <img src={product?.productId?.image_product} className="w-full h-[80px] " alt="" />
                    </div>
                    <div className="pr-2 basis-full">
                      <h2 className="w-full text-sm lg:text-[16px]">
                        {product?.productId?.name_product}
                      </h2>
                      <div className="flex justify-between gap-2 py-2">
                        <p className="text-xs lg:text-sm text-[#0000008a] ">
                          <p>Phân loại: <span className="font-bold">{product?.color_item} - {product?.name_size}</span> </p>
                        </p>
                        <div className="text-sm">
                          x <span>{product.quantity}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end lg:justify-between gap-2">
                        <span className="border border-[#26aa99] rounded w-full lg:w-[25%] text-center text-xs lg:text-sm p-1 text-[#26aa99] order-2 lg:order-1">
                          Trả hàng miễn phí 15 ngày
                        </span>
                        <p className="flex gap-2 text-sm lg:text-[18px] text-orange-400 order-1 lg:order-2"><s className="text-black">₫45.000 </s>{product?.productId?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                      </div>
                    </div>
                  </div>)
                }
                )}
                <div className="py-3 px-2 flex justify-end items-center border-t  border-b border-[#eaeaea] ">
                  <div className="flex items-center gap-1">
                    <TotalPrice />
                    <p>Thành tiền : <span className="lg:text-lg text-sm text-[#f68e56]">{item.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                  </div>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full py-4 px-2">
                  <p className="lg:basis-9/12 text-[#0000008A] text-[12px]">
                    Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã
                    được giao đến bạn và sản phẩm nhận được không có vấn
                    đề nào.
                  </p>
                  <div className="flex gap-3 lg:basis-3/12 w-full">
                    <Button className="bg-stone-300 w-full h-10 lg:w-[50%] text-white text-[12px] rounded">
                      Đã Nhận Hàng
                    </Button>
                    <Popconfirm
                      title="Mua lại đơn hàng?"
                      description="Bạn có chắc chắn muốn mua lại không?"
                      onConfirm={() => addCart(dataProps?._id)}
                      // onCancel={cancel}
                      okText="Có "
                      cancelText="Không"
                    >
                      <Button className="bg-red-500 w-full h-10 lg:w-[50%] text-white text-[12px] rounded">
                        Mua Lại
                      </Button>
                    </Popconfirm>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Complete;
