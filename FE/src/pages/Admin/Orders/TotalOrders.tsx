import React, { useState, useEffect } from "react";
import { Table, Spin, Alert } from "antd";
import instance from "../../../configs/axios";

// Định nghĩa kiểu dữ liệu cho đơn hàng và địa chỉ
interface Order {
  _id: string; // Sử dụng _id làm rowKey
  fullName: string; // Tên của Shipper
  totalOrders: number;
  orderDetails: { orderNumber: string; address: string }[]; // Danh sách đơn hàng kèm địa chỉ
}

const TotalOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Sử dụng kiểu dữ liệu Order[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Kiểu dữ liệu cho lỗi có thể là chuỗi hoặc null

  useEffect(() => {
    // Gọi API để lấy dữ liệu đơn hàng
    const fetchOrders = async () => {
      try {
        const response = await instance.get("/orders/daily-order-summary");
        console.log(response.data); // In ra dữ liệu để kiểm tra

        // Kiểm tra xem response.data có phải là danh sách shipper (cho admin) hay một đối tượng shipper (cho courier)
        if (Array.isArray(response.data.shippers)) {
          // Trường hợp admin, dữ liệu là danh sách các shipper
          setOrders(response.data.shippers);
        } else {
          // Trường hợp shipper, dữ liệu chỉ là một shipper và cần chuyển thành mảng
          setOrders([response.data]);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu."); // Lưu lỗi vào state
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cấu trúc của các cột trong bảng Ant Design
  const columns = [
    {
      title: "Tên Shipper",
      dataIndex: "fullName", // Lấy tên shipper từ `fullName`
      key: "fullName",
    },
    {
      title: "Tổng số đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "Địa chỉ giao hàng",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails: { orderNumber: string; address: string }[]) => (
        <ul>
          {orderDetails.map((detail, index) => (
            <li key={index}>Địa chỉ: Tòa nhà FPT - {detail.address}</li>
          ))}
        </ul>
      ),
    },
  ];

  // Hiển thị khi đang tải dữ liệu
  if (loading) {
    return (
      <div className="text-center py-4">
        <Spin size="large" /> {/* Loading spinner */}
      </div>
    );
  }

  // Hiển thị thông báo lỗi nếu có lỗi
  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="my-4"
      />
    );
  }

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-semibold mb-4">
        Danh sách đơn hàng đã giao
      </h2>
      <Table
        columns={columns} // Cấu trúc cột
        dataSource={orders} // Dữ liệu nguồn
        rowKey={(record) => record._id} // Sử dụng _id làm rowKey
        pagination={{ pageSize: 5 }} // Số dòng mỗi trang
      />
    </div>
  );
};

export default TotalOrders;
