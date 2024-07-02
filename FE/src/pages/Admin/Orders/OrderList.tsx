import { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import instance from "../../../configs/axios";

const OrderList = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const [status, setStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchOrders = async (page: number, status: string = "") => {
    try {
      const { data } = await instance.get(`/orders?page=${page}&status=${status}`);
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, status);
  }, [currentPage, status]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    setCurrentPage(1); // Reset to first page when status changes
  };

  const handlePageChange = (page: number) => {
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
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Lọc trạng thái</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Đã giao hàng">Đã giao hàng</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
          </div>
          <OrderTable
            orders={orders}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
