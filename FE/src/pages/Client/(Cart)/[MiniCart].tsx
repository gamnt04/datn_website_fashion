import { Link } from "react-router-dom";
import ScrollTop from "../../../common/hooks/Customers/ScrollTop";
import { RecycleIcon } from "../../../resources/svg/Icon/Icon";
import { IProduct } from "../../../common/interfaces/Product";
import { useCart } from "../../../common/hooks/Cart/useCart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";

const MiniCart = () => {
  const { data, removeProductInCart, calculateTotal, calculateTotalProduct } =
    useCart();
  const [user] = useLocalStorage("user", {});
  const account = user?.user;

  return (
    <div
      className="absolute rounded bg-white shadow mb:w-[70vw] lg:w-[25vw] duration-300 right-0 group-hover:scale-100 scale-0 shadow-2xl 
    p-4 group-hover:translate-y-[15px] lg:group-hover:translate-x-0 group-hover:translate-x-1/2 translate-x-1/2 -translate-y-1/2
    before:absolute before:w-[65px] before:h-[40px] before:right-[-5px] before:top-0 before:translate-y-[-20px] before:bg-none"
    >
      {account ? (
        <>
          {!data?.products || data?.products.length === 0 ? (
            <div className="text-center p-4">
              <p>Please add products to your cart</p>
            </div>
          ) : (
            <>
              <div className="mb-[20px]">
                <span className="text-sm">
                  You have {calculateTotalProduct()} items in your cart
                </span>
              </div>
              <div className="grid h-full grid-flow-rows">
                {data?.products.map((item: IProduct, index: number) => (
                  <div
                    className="border-b w-full grid grid-cols-[70px_auto] py-[20px] gap-3 auto-rows-[70px]"
                    key={index}
                  >
                    <div className="bg-[#f2f2f2] p-2">
                      <img
                        className="relative z-[1] w-full h-full duration-300"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="flex flex-col *:text-sm justify-between">
                        <span>{item.name}</span>
                        <strong>
                          {item.quantity} x ${item.price}
                        </strong>
                        <span>Size: S</span>
                      </div>
                      <div className="flex items-end cursor-pointer">
                        <button
                          type="button"
                          onClick={() =>
                            removeProductInCart.mutate(item.productId)
                          }
                        >
                          <RecycleIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between items-center my-6">
                  <strong>Subtotal</strong>
                  <strong>${calculateTotal()}</strong>
                </div>
                <div className="flex flex-col gap-y-[20px] *:rounded-md *:w-full *:h-[55px] *:grid *:place-items-center *:text-sm">
                  <Link
                    onClick={ScrollTop}
                    to="/cart"
                    className="bg-black text-white cursor-pointer"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center p-4">
          <p>Please login to view your cart</p>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
