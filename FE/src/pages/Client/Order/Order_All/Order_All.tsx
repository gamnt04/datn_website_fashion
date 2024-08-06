import { useState } from "react";
import Canceled from "../Canceled/Canceled";
import Complete from "../Complete/Complete";
import WaitingForDelivery from "../WaitingForDelivery/WaitingForDelivery";
import Waitforconfirmation from "../Waitforconfirmation/Waitforconfirmation";
import WaitingForGoods from "../WaitingForGoods/WaitingForGoods";
import useSearchOrderByNumber from "../../../../common/hooks/Order/useSearchOrderByNumber";

interface Order {
  _id: string;
  orderNumber: string;
  status: string; // Thêm thuộc tính status ở đây
}

interface Order_AllProps {
  data: Order[];
}

const Order_All: React.FC<Order_AllProps> = ({ data }) => {
  const statuses: { [key: string]: string } = {
    "Chờ Xác Nhận": "1",
    "Đang Chuẩn Bị Hàng": "2",
    "Đang Vận Chuyển": "3",
    "Hoàn Thành": "4",
    "Đã Hủy": "5",
    "Trả Hàng / Hoàn Tiền": "6",
  };

  const filterOrder = (status: string) =>
    data.filter((order) => order.status === statuses[status]);

  const hasData = (status: string) => filterOrder(status).length > 0;

  const { order, error, loading, searchOrderByNumber } =
    useSearchOrderByNumber();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchOrderByNumber(searchTerm);
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 py-3 px-3 my-4 bg-slate-50"
        >
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
          {hasData("Chờ Xác Nhận") && (
            <Waitforconfirmation dataProps={filterOrder("Chờ Xác Nhận")} />
          )}
          {hasData("Đang Chuẩn Bị Hàng") && (
            <WaitingForGoods dataProps={filterOrder("Đang Chuẩn Bị Hàng")} />
          )}
          {hasData("Đang Vận Chuyển") && (
            <WaitingForDelivery dataProps={filterOrder("Đang Vận Chuyển")} />
          )}
          {hasData("Đã Hủy") && <Canceled dataProps={filterOrder("Đã Hủy")} />}
          {hasData("Hoàn Thành") && (
            <Complete dataProps={filterOrder("Hoàn Thành")} />
          )}
        </>
      )}
    </>
  );
};

export default Order_All;
