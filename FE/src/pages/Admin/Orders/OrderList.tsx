import { useState } from "react";
import OrderTable from "./OrderTable";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
import { Select } from "antd";
const { Option } = Select;
const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, totalPages } = Query_Orders(undefined, currentPage, statusFilter);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };
  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mt-16 mx-2">
        <div>
          <div className="flex justify-between my-3">
            <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-[160px] h-[40px]"
              placeholder="Lọc trạng thái"
            >
              <Option value="">Lọc trạng thái</Option>
              <Option value="1">Chờ xác nhận</Option>
              <Option value="2">Đang chuẩn bị hàng</Option>
              <Option value="3">Đang vận chuyển</Option>
              <Option value="4">Đã giao hàng</Option>
              <Option value="5">Đã hủy</Option>
            </Select>
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
