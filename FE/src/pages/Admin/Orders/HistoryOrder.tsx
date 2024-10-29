import { useState } from "react";
import OrderTable from "./OrderTable";
import {
  Query_Orders,
  useSearchOrdersByNumberOrNumberPhone,
} from "../../../common/hooks/Order/querry_Order";
import { Button, Input, Select } from "antd";
const { Option } = Select;

const HistoryOrder = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOrder, setSearchOrder] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const idUser = user?.user?._id;
  const { data: searchData } = useSearchOrdersByNumberOrNumberPhone(
    searchOrder,
    idUser
  );
  const { data, isLoading, totalPages } = Query_Orders(
    undefined,
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

  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  console.log(dataSource);

  const filteredDataSource =
    dataSource?.filter((order) => order.status !== "3") || [];
  console.log(filteredDataSource);

  return (
    <div>
      <div className="mx-6">
        <div className="flex items-center justify-between mt-20 mb-5">
          <h1 className="text-2xl font-semibold">Lịch sử giao hàng</h1>
        </div>

        <OrderTable
          orders={filteredDataSource}
          isLoading={isLoading}
          currentPage={currentPage}
          goToPage={goToPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default HistoryOrder;
