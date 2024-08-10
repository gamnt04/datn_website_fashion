import { useContext, useEffect, useState } from "react";
import Canceled from "../Canceled/Canceled";
import Complete from "../Complete/Complete";
import WaitingForDelivery from "../WaitingForDelivery/WaitingForDelivery";
import Waitforconfirmation from "../Waitforconfirmation/Waitforconfirmation";
import WaitingForGoods from "../WaitingForGoods/WaitingForGoods";
import useSearchOrderByNumber from "../../../../common/hooks/Order/useSearchOrderByNumber";
import queryString from "query-string";
import instance from "../../../../configs/axios";
import { message } from "antd";
import { List_One_Order_User } from "../../../../common/hooks/Order/querry_Order";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import { LoadingContext } from "../Order-All/LoadingContext";
import LoadingOverlay from "react-loading-overlay-ts";
import { set } from "lodash";

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
}

interface Order_AllProps {
  data: Order[];
}

const Order_All: React.FC<Order_AllProps> = ({ data }) => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [isActive, setActive] = useState<boolean>(false);
  // const { isActive, dispatch } = useContext(LoadingContext);
  const { refetch } = List_One_Order_User(userId);

  const statuses: { [key: string]: string } = {
    "Chờ Xác Nhận": "1",
    "Đang Chuẩn Bị Hàng": "2",
    "Đang Vận Chuyển": "3",
    "Hoàn Thành": "4",
    "Đã Hủy": "5",
    "Trả Hàng / Hoàn Tiền": "6",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsed = queryString.parseUrl(location.search);

        if (parsed.query.vnp_TransactionStatus === "00") {
          const itemOrder = sessionStorage.getItem("item_order");
          const customerInfo = sessionStorage.getItem("customerInfo");

          if (itemOrder && customerInfo) {
            const getItemOrder = JSON.parse(itemOrder);
            const dataForm = JSON.parse(customerInfo);
            setActive(true);
            const response = await instance.post("/orderspayment", {
              userId: getItemOrder.userId,
              items: getItemOrder?.items,
              customerInfo: {
                ...dataForm,
              },
              totalPrice: Number(parsed.query.vnp_Amount) / 100,
              status: "2",
            });

            console.log(response.data);
            if (response.data) {
              message.success("Thanh toán thành công");
              sessionStorage.removeItem("item_order");
              sessionStorage.removeItem("customerInfo");
              refetch();
              setActive(false);
            }
          } else {
            console.error("Item order or customer info is missing in session storage");
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        message.error("Có lỗi xảy ra trong quá trình thanh toán");
        setActive(false);
      }
    };

    fetchData();
  }, [location.search]);

  const filterOrder = (status: string) => data.filter((order) => order.status === statuses[status]);

  const hasData = (status: string) => filterOrder(status).length > 0;

  const { order, error, loading, searchOrderByNumber } = useSearchOrderByNumber();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchOrderByNumber(searchTerm);
  };

  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text="Loading"
      styles={{
        overlay: (base) => ({
          ...base,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
        }),
      }}
    >
      <div>
        <form onSubmit={handleSearch} className="flex items-center gap-3 py-3 px-3 my-4 bg-slate-50">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm"
            className="w-full outline-none px-2 bg-slate-50"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>

      {loading && <p>Đang tải...</p>}
      {error && <p>{error.message}</p>}

      {order ? (
        <>
          {order.status === "1" && <Waitforconfirmation dataProps={[order]} />}
          {order.status === "2" && <WaitingForGoods dataProps={[order]} />}
          {order.status === "3" && <WaitingForDelivery dataProps={[order]} />}
          {order.status === "4" && <Complete dataProps={[order]} />}
          {order.status === "5" && <Canceled dataProps={[order]} />}
        </>
      ) : (
        <>
          {hasData("Chờ Xác Nhận") && <Waitforconfirmation dataProps={filterOrder("Chờ Xác Nhận")} />}
          {hasData("Đang Chuẩn Bị Hàng") && <WaitingForGoods dataProps={filterOrder("Đang Chuẩn Bị Hàng")} />}
          {hasData("Đang Vận Chuyển") && <WaitingForDelivery dataProps={filterOrder("Đang Vận Chuyển")} />}
          {hasData("Đã Hủy") && <Canceled dataProps={filterOrder("Đã Hủy")} />}
          {hasData("Hoàn Thành") && <Complete dataProps={filterOrder("Hoàn Thành")} />}
        </>
      )}
    </LoadingOverlay>
  );
};

export default Order_All;