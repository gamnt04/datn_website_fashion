import { useState } from "react";
import OrderTable from "./OrderTable";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, totalPages } = Query_Orders(undefined, currentPage, statusFilter);

  const handleStatusChange = (e: any) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1)
  };
  const goToPage = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="mt-16">
        <div>
          <div className="flex justify-between my-3">
            <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>
            <select
              name="status"
              id="status"
              className="w-[200px] h-[50px] border rounded-lg px-2"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="">Lọc trạng thái</option>
              <option value="1">Chờ xác nhận</option>
              <option value="2">Đang chuẩn bị hàng</option>
              <option value="3">Đang vận chuyển</option>
              <option value="4">Đã giao hàng</option>
              <option value="5">Đã hủy</option>
            </select>
          </div>
          <OrderTable
            orders={data}
            isLoading={isLoading}
            currentPage={currentPage}
            goToPage={goToPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
