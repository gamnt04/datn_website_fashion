import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { message, Card, Typography } from "antd";
import instance from "../../../../configs/axios";
import { Chart, registerables } from "chart.js";

// Đăng ký các thành phần của Chart.js
Chart.register(...registerables);

const { Text } = Typography;

const OrderStatsWeek = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersPerDay, setOrdersPerDay] = useState(new Array(7).fill(0));
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");

  useEffect(() => {
    const fetchOrdersThisWeek = async () => {
      try {
        const response = await instance.get("/orders/order_shipper_week");

        if (
          response.data &&
          response.data.totalOrders !== undefined &&
          response.data.ordersPerDay
        ) {
          const { totalOrders, ordersPerDay, weekStart, weekEnd } =
            response.data;
          setTotalOrders(totalOrders);
          setOrdersPerDay(
            ordersPerDay.length > 0 ? ordersPerDay : new Array(7).fill(0)
          );
          setWeekStart(weekStart);
          setWeekEnd(weekEnd);
        } else {
          message.warning("Dữ liệu không hợp lệ.");
        }
      } catch (error) {
        message.error("Không thể lấy thông tin đơn hàng.");
        console.error("Error fetching orders this week:", error);
      }
    };

    fetchOrdersThisWeek();
  }, []);

  // Dữ liệu cho biểu đồ
  const data = {
    labels: [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: ordersPerDay,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="border border-gray-200 bg-white shadow-lg rounded-lg p-0 mx-auto my-0 w-full h-full">
      <h1 className="text-lg font-semibold text-center p-4">
        Tổng số đơn hàng trong tuần này: {totalOrders}
      </h1>
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Để biểu đồ chiếm toàn bộ chiều cao
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Số lượng đơn hàng",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Ngày trong tuần",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || "";
                    const value = context.raw || 0;
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </Card>
  );
};

export default OrderStatsWeek;
