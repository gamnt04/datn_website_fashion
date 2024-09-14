import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import {
  Query_Orders,
  useSearchOrdersByNumberOrNumberPhone,
} from "../../../common/hooks/Order/querry_Order";
import { Button, Input, Select } from "antd";
const { Option } = Select;
import useLocalStorage from "../../../common/hooks/Storage/useStorage"; // Đảm bảo import đúng đường dẫn

const OrderList = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOrder, setSearchOrder] = useState("");

  // Lấy thông tin người dùng từ localStorage
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const userRole = user?.user?.role;

  // Kiểm tra nếu user là shipper thì lấy userId, nếu không thì để undefined
  const shipperId = userRole === "shipper" ? userId : undefined;

  // Gọi API: Nếu là admin thì lấy tất cả, nếu là shipper thì lọc theo shipperId
  const { data: searchData } =
    useSearchOrdersByNumberOrNumberPhone(searchOrder);
  const { data, isLoading, totalPages } = Query_Orders(
    shipperId, // Truyền shipperId nếu có, nếu không sẽ lấy tất cả (admin)
    currentPage,
    statusFilter
  );

  const dataSource = searchData ? searchData : data;

  const onHandleSearch = () => {
    setSearchOrder(searchOrder.trim());
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Có thể thêm logic khác nếu cần khi role thay đổi
  }, [userRole]);

  return (
    <div>
      <div className="mx-6">
        <div className="flex items-center justify-between mt-20 mb-5">
          <h1 className="text-2xl font-semibold">Quản Lý Đơn Hàng</h1>
        </div>
        <div className="mb-2 flex justify-between">
          <div className="space-x-5">
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-[200px] h-[40px]"
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
          <div className="flex space-x-5">
            <Input
              className="w-[500px] h-9"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              placeholder="Nhập mã đơn hàng hoặc số điện thoại của khách hàng để tìm kiếm..."
            />
            <Button onClick={onHandleSearch} type="primary" className="h-9">
              Tìm kiếm
            </Button>
          </div>
        </div>

        <OrderTable
          orders={dataSource}
          isLoading={isLoading}
          currentPage={currentPage}
          goToPage={goToPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default OrderList;
