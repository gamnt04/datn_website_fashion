import { useEffect, useState } from "react";
import instance from "../../../configs/axios";
import { Table, Typography, message } from "antd";
import { IOrder } from "../../../common/interfaces/Orders";
interface ShipperOrderSummary {
  shipperId: string;
  fullName: string;
  totalOrders: number;
  lastDeliveryLocation: string; 
}
const DailyOrderSummary = () => {
  const [orderSummary, setOrderSummary] = useState<ShipperOrderSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await instance.get("/orders/daily-order-summary");
        console.log("Dữ liệu từ API:", response.data);
        setOrderSummary(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng:", error);
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, []);

  const columns = [
    {
      title: "Tên Shipper",
      dataIndex: "fullName", 
      key: "fullName",
    },
    {
      title: "Số lượng đơn hàng",
      dataIndex: "totalOrders", 
      key: "totalOrders",
    },
    {
      title: "Từ đâu đến đâu",
      key: "deliveryRoute",
      render: (record: ShipperOrderSummary) => (
        <span>
          Từ Tòa nhà FPT đến {record.lastDeliveryLocation || "Không có địa chỉ"}
        </span>
      ),
    },
  ];

  return (
    <div className="m-6">
      <div className="flex items-center justify-between mt-20 mb-5">
        <h1 className="text-2xl font-semibold">
          Tổng hợp số lượng đơn hàng trong ngày của từng shipper
        </h1>
      </div>
      <Table
        columns={columns}
        dataSource={orderSummary}
        rowKey="shipperId"
        loading={loading} 
        pagination={false} 
      />
    </div>
  );
};

export default DailyOrderSummary;
