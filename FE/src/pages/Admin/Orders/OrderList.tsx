import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Select, Spin, Tooltip } from "antd";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { AiOutlineExport } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Query_Orders,
  useAllOrderSuccess,
  useSearchOrdersByNumberOrNumberPhone
} from "../../../common/hooks/Order/querry_Order";
import OrderTable from "./OrderTable";

const { Option } = Select;

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialStatusFilter = queryParams.get("status") || "";
  const initialPage = parseInt(queryParams.get("page") || "1", 10);

  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [searchOrder, setSearchOrder] = useState<string>("");
  const [dataExport, setDataExport] = useState<any[]>([]);

  const { data: DataAllOrdersSuccess } = useAllOrderSuccess();
  const { data: searchData } =
    useSearchOrdersByNumberOrNumberPhone(searchOrder);
  const { data, isLoading, totalPages } = Query_Orders(
    undefined,
    currentPage,
    statusFilter
  );
  const dataSource = searchData || data;

  const handleSearch = () => setSearchOrder(searchOrder.trim());

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => setCurrentPage(page);

  useEffect(() => {
    const query = new URLSearchParams();
    if (statusFilter) query.set("status", statusFilter);
    query.set("page", currentPage.toString());

    navigate(`?${query.toString()}`, { replace: true });
  }, [statusFilter, currentPage, navigate]);

  useEffect(() => {
    if (DataAllOrdersSuccess?.length) {
      const formattedData = DataAllOrdersSuccess.map((item: any) => ({
        number_order: item.orderNumber,
        name_customer: item.customerInfo?.userName || "N/A",
        number_phone_customer: item.customerInfo?.phone || "N/A",
        email_customer: item.customerInfo?.email || "N/A",
        address_customer: item.customerInfo?.address || "N/A",
        order_date: item.createdAt,
        order_success: item.deliveredAt || "Chưa giao",
        products: item.items?.map((p: any) => ({
          name_product: p.productId.name_product,
          price_product: p.total_price_item,
          quantity_product: p.quantity,
          classification_product: `${p.color_item} - ${p.name_size}`
        })),
        total_price_order: item.totalPrice
      }));
      setDataExport(formattedData);
    }
  }, [DataAllOrdersSuccess]);
  const [dataState, setDataState] = useState<any[]>([]);

  useEffect(() => {
    if (dataExport) {
      const tempData: any[] = [];

      dataExport.forEach((item, index) => {
        item.products.forEach((p: any) => {
          tempData.push({
            stt: index + 1,
            number_order: item.number_order,
            name_customer: item.name_customer,
            number_phone_customer: item.number_phone_customer,
            email_customer: item.email_customer,
            address_customer: item.address_customer,
            order_date: item.order_date,
            order_success: item.order_success,
            name_product: p.name_product,
            price_product: p.price_product,
            quantity_product: p.quantity_product,
            classification_product: p.classification_product,
            total_price_order: item.total_price_order
          });
        });
      });

      setDataState((prevData) => [...prevData, ...tempData]);
    }
  }, [dataExport]);

  const handleExport = async () => {
    // const exportData: any[] = [];
    // exportData.push();

    const header = [
      "STT",
      "Mã đơn hàng",
      "Tên khách hàng",
      "Số điện thoại",
      "Email",
      "Địa chỉ",
      "Ngày đặt hàng",
      "Ngày hoàn thành",
      "Tên sản phẩm",
      "Giá sản phẩm",
      "Số lượng sản phẩm",
      "Phân loại sản phẩm",
      "Tổng đơn hàng"
    ];

    const worksheet = XLSX.utils.json_to_sheet(dataState, { header: header });
    console.log("worksheet", worksheet);

    const merges: any[] = [];
    let currentId: any = null;
    let currentRowIndex: any = null;
    dataState.forEach((row, index) => {
      if (row.number_order !== currentId) {
        // Nếu ID thay đổi, ghi lại row cũ (nếu có)
        if (currentRowIndex !== null && index > currentRowIndex) {
          merges.push({
            s: { r: currentRowIndex, c: 0 }, // Cột number_order
            e: { r: index - 1, c: 0 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 1 }, // Cột name_customer
            e: { r: index - 1, c: 1 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 2 }, // Cột number_phone_customer
            e: { r: index - 1, c: 2 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 3 }, // Cột email_customer
            e: { r: index - 1, c: 3 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 4 }, // Cột address_customer
            e: { r: index - 1, c: 4 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 5 }, // Cột order_date
            e: { r: index - 1, c: 5 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 6 }, // Cột order_success
            e: { r: index - 1, c: 6 }
          });
          merges.push({
            s: { r: currentRowIndex, c: 11 }, // Cột total_price_order
            e: { r: index - 1, c: 11 }
          });
        }
        currentId = row.number_order;
        currentRowIndex = index;
      }
    });

    if (currentRowIndex !== null && dataState.length > currentRowIndex) {
      merges.push({
        s: { r: currentRowIndex, c: 0 },
        e: { r: dataState.length - 1, c: 0 }
      });
      merges.push({
        s: { r: currentRowIndex, c: 1 },
        e: { r: dataState.length - 1, c: 1 }
      });
    }

    worksheet["!merges"] = merges;
    worksheet["!merges"].push({
      s: { r: 0, c: 0 },
      e: { r: 0, c: 3 }
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Dữ liệu đơn hàng hoàn thành"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "Dữ liệu đơn hàng hoàn thành.xlsx");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  return (
    <div className="mx-6">
      <div className="flex items-center justify-between mt-20 mb-5">
        <h1 className="text-2xl font-semibold">Quản Lý Đơn Hàng</h1>
      </div>
      <div className="mb-2 flex justify-between">
        <div className="flex gap-2 ">
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
            <Option value="4">Giao hàng thành công</Option>
            <Option value="5">Giao hàng thất bại</Option>
            <Option value="6">Hoàn thành</Option>
            <Option value="7">Đã hủy</Option>
          </Select>
          <div className="flex space-x-2">
            {" "}
            <Input
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              placeholder="Nhập mã đơn hàng hoặc số điện thoại để tìm kiếm..."
              className="w-[500px] h-10"
            />
            <Button
              onClick={handleSearch}
              type="primary"
              className="w-[100px] h-10"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className="flex space-x-5">
          <Tooltip placement="topLeft" title={"Xuất dữ liệu đơn hàng"}>
            <Button
              onClick={handleExport}
              className="bg-[#13DEB9] text-[white] border-none h-10"
            >
              <AiOutlineExport />
              Xuất dữ liệu
            </Button>
          </Tooltip>
        </div>
      </div>
      <OrderTable
        orders={dataSource}
        refetch={Query_Orders}
        isLoading={isLoading}
        currentPage={currentPage}
        goToPage={goToPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default OrderList;
