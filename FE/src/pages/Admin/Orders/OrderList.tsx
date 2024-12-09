// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import OrderTable from "./OrderTable";
// import {
//   Query_Orders,
//   useAllOrderSuccess,
//   useSearchOrdersByNumberOrNumberPhone
// } from "../../../common/hooks/Order/querry_Order";
// import { Button, Input, Select, Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// const { Option } = Select;

// const OrderList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Read search params from the URL
//   const queryParams = new URLSearchParams(location.search);
//   const initialStatusFilter = queryParams.get("status") || "";
//   const initialPage = parseInt(queryParams.get("page") || "1", 10);

//   const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [searchOrder, setSearchOrder] = useState("");
//   const [dataExport, setDataExport] = useState<any[]>([]);
//   const { data: DataAllOrdersSuccess } = useAllOrderSuccess();
//   const { data: searchData } =
//     useSearchOrdersByNumberOrNumberPhone(searchOrder);
//   const { data, isLoading, totalPages } = Query_Orders(
//     undefined,
//     currentPage,
//     statusFilter
//   );
//   const dataSource = searchData ? searchData : data;

//   const onHandleSearch = () => {
//     setSearchOrder(searchOrder.trim());
//   };

//   const handleStatusChange = (value: string) => {
//     setStatusFilter(value);
//     setCurrentPage(1);
//   };

//   const goToPage = (page: number) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     const query = new URLSearchParams();
//     if (statusFilter) query.set("status", statusFilter);
//     query.set("page", currentPage.toString());

//     navigate(`?${query.toString()}`, { replace: true });
//   }, [statusFilter, currentPage, navigate]);

//   useEffect(() => {
//     if (DataAllOrdersSuccess?.length > 0) {
//       const formattedData = DataAllOrdersSuccess.map((item: any) => ({
//         number_order: item.orderNumber,
//         name_customer: item.customerInfo?.userName || "N/A",
//         number_phone_customer: item.customerInfo?.phone || "N/A",
//         email_customer: item.customerInfo?.email || "N/A",
//         address_customer: item.customerInfo?.address || "N/A",
//         order_date: item.createdAt,
//         order_success: item.deliveredAt || "Chưa giao",
//         products: item.items?.map((p: any) => ({
//           name_product: p.productId.name_product,
//           price_product: p.total_price_item,
//           quantity_product: p.quantity,
//           classification_product: ` ${p.color_item} - ${p.name_size}`
//         })),
//         total_price_order: item.totalPrice
//       }));
//       setDataExport(formattedData);
//     }
//   }, [DataAllOrdersSuccess]);

//   const onHandleExport = () => {
//     const exportData: any[] = [];
//     dataExport.forEach((item: any, index: number) => {
//       item.products.forEach((p: any) => {
//         exportData.push({
//           stt: index + 1,
//           number_order: item.number_order,
//           name_customer: item.name_customer,
//           number_phone_customer: item.number_phone_customer,
//           email_customer: item.email_customer,
//           address_customer: item.address_customer,
//           order_date: item.order_date,
//           order_success: item.order_success,
//           name_product: p.name_product,
//           price_product: p.price_product,
//           quantity_product: p.quantity_product,
//           classification_product: p.classification_product,
//           total_price_order: item.total_price_order
//         });
//       });
//     });
//     const header = [
//       "STT",
//       "Mã đơn hàng",
//       "Tên khách hàng",
//       "Số điện thoại",
//       "Email",
//       "Địa chỉ",
//       "Ngày đặt hàng",
//       "Ngày hoàn thành",
//       "Tên sản phẩm",
//       "Giá sản phẩm",
//       "Số lượng sản phẩm",
//       "Phân loại sản phẩm",
//       "Tổng đơn hàng"
//     ];
//     const worksheet = XLSX.utils.json_to_sheet(exportData, { header: header });
//     const merges: any[] = [];
//     // Gộp ô cho cột ID và Name nếu chúng giống nhau
//     let currentId: any = null;
//     let currentRowIndex: any = null;
//     exportData.forEach((row, index) => {
//       if (row.number_order !== currentId) {
//         // Nếu ID thay đổi, ghi lại row cũ (nếu có)
//         if (currentRowIndex !== null && index > currentRowIndex) {
//           merges.push({
//             s: { r: currentRowIndex, c: 0 }, // Cột number_order
//             e: { r: index - 1, c: 0 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 1 }, // Cột name_customer
//             e: { r: index - 1, c: 1 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 2 }, // Cột number_phone_customer
//             e: { r: index - 1, c: 2 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 3 }, // Cột email_customer
//             e: { r: index - 1, c: 3 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 4 }, // Cột address_customer
//             e: { r: index - 1, c: 4 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 5 }, // Cột order_date
//             e: { r: index - 1, c: 5 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 6 }, // Cột order_success
//             e: { r: index - 1, c: 6 }
//           });
//           merges.push({
//             s: { r: currentRowIndex, c: 11 }, // Cột total_price_order
//             e: { r: index - 1, c: 11 }
//           });
//         }
//         currentId = row.number_order;
//         currentRowIndex = index;
//       }
//     });

//     // Gộp cho dòng cuối cùng
//     if (currentRowIndex !== null && exportData.length > currentRowIndex) {
//       merges.push({
//         s: { r: currentRowIndex, c: 0 },
//         e: { r: exportData.length - 1, c: 0 }
//       });
//       merges.push({
//         s: { r: currentRowIndex, c: 1 },
//         e: { r: exportData.length - 1, c: 1 }
//       });
//     }

//     // Thêm các ô gộp vào worksheet
//     worksheet["!merges"] = merges;
//     worksheet["!merges"].push({
//       s: { r: 0, c: 0 },
//       e: { r: 0, c: 13 } // Gộp các ô từ cột 0 đến cột 3
//     });
//     worksheet["A1"] = {
//       v: "Danh sách đơn hàng hoàn thành",
//       s: { font: { bold: true, size: 14 }, alignment: { horizontal: "center" } }
//     };
//     console.log("worksheet", worksheet);

//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(
//       workbook,
//       worksheet,
//       "Dữ liệu đơn hàng hoàn thành"
//     );
//     console.log("workbook", workbook);

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array"
//     });
//     console.log("excelBuffer", excelBuffer);

//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     console.log("blob", blob);

//     saveAs(blob, "Dữ liệu đơn hàng hoàn thành.xlsx");
//   };

//   console.log("DataAllOrdersSuccess", DataAllOrdersSuccess);
//   console.log("setDataExport", dataExport);
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin indicator={<LoadingOutlined spin />} size="large" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mx-6">
//         <div className="flex items-center justify-between mt-20 mb-5">
//           <h1 className="text-2xl font-semibold">Quản Lý Đơn Hàng</h1>
//         </div>
//         <div className="mb-2 flex justify-between">
//           <div className="space-x-5">
//             <Select
//               value={statusFilter}
//               onChange={handleStatusChange}
//               className="w-[200px] h-[40px]"
//               placeholder="Lọc trạng thái"
//             >
//               <Option value="">Lọc trạng thái</Option>
//               <Option value="1">Chờ xác nhận</Option>
//               <Option value="2">Đang chuẩn bị hàng</Option>
//               <Option value="3">Đang vận chuyển</Option>
//               <Option value="4">Giao hàng thành công</Option>
//               <Option value="5">Giao hàng thất bại</Option>
//               <Option value="6">Hoàn thành</Option>
//               <Option value="7">Đã hủy</Option>
//             </Select>
//           </div>
//           <Button type="primary" className="h-9" onClick={onHandleExport}>
//             Export
//           </Button>
//           <div className="flex space-x-5">
//             <Input
//               className="w-[500px] h-9"
//               value={searchOrder}
//               onChange={(e) => setSearchOrder(e.target.value)}
//               placeholder="Nhập mã đơn hàng hoặc số điện thoại của khách hàng để tìm kiếm..."
//             />
//             <Button onClick={onHandleSearch} type="primary" className="h-9">
//               Tìm kiếm
//             </Button>
//           </div>
//         </div>

//         <OrderTable
//           orders={dataSource}
//           refetch={Query_Orders}
//           isLoading={isLoading}
//           currentPage={currentPage}
//           goToPage={goToPage}
//           totalPages={totalPages}
//         />
//       </div>
//     </div>
//   );
// };

// export default OrderList;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderTable from "./OrderTable";
import {
  Query_Orders,
  useAllOrderSuccess,
  useSearchOrdersByNumberOrNumberPhone
} from "../../../common/hooks/Order/querry_Order";
import { Button, Input, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  console.log("dataState", dataState);

  const handleExport = async () => {
    const exportData: any[] = [];
    exportData.push();

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
    // Gộp ô cho cột ID và Name nếu chúng giống nhau
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

    // Gộp cho dòng cuối cùng
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

    console.log("merges", merges);

    // Thêm các ô gộp vào worksheet
    worksheet["!merges"] = merges;
    worksheet["!merges"].push({
      s: { r: 0, c: 0 },
      e: { r: 0, c: 3 } // Gộp các ô từ cột 0 đến cột 3
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
        <Button type="primary" onClick={handleExport}>
          Export
        </Button>
        <div className="flex space-x-5">
          <Input
            value={searchOrder}
            onChange={(e) => setSearchOrder(e.target.value)}
            placeholder="Nhập mã đơn hàng hoặc số điện thoại để tìm kiếm..."
            className="w-[500px] h-9"
          />
          <Button onClick={handleSearch} type="primary">
            Tìm kiếm
          </Button>
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
