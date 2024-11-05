import React from "react";
import { Card, Table, Row, Col, Divider } from "antd";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";

const Salary = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const currentMonth = new Date().getMonth() + 1;

  // Thay đổi queryFn để trả về dữ liệu từ `response.data`
  const { data: salary_month } = useQuery({
    queryKey: ["Salary_shipper_month"],
    queryFn: async () => {
      const response = await instance.get(
        `/shippers/${userId}/salary/calculate`
      );
      return response.data; // Truy cập vào `data` của response
    },
    staleTime: 0, // Dữ liệu sẽ luôn được lấy mới
  });
  console.log(salary_month);

  const { data: salary_daily } = useQuery({
    queryKey: ["Salary_shipper_daily"],
    queryFn: async () => {
      const response = await instance.get("/orders_daily");
      return response.data; // Truy cập vào `data` của response
    },
    staleTime: 0, // Dữ liệu sẽ luôn được lấy mới
  });
  console.log(salary_daily);

  // Lấy tháng và năm hiện tại
  const currentYear = new Date().getFullYear();

  // Convert dữ liệu từ salary_daily thành mảng cho bảng và chỉ lấy các ngày trong tháng hiện tại
  const dailyData = salary_daily
    ? Object.entries(salary_daily.dailyStats)
        .map(([date, stats]) => ({
          date,
          orderCount: stats.orderCount,
          totalDistance: stats.totalDistance,
        }))
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getFullYear() === currentYear &&
            itemDate.getMonth() + 1 === currentMonth
          );
        })
    : [];

  // Các cột của bảng
  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tổng số đơn",
      dataIndex: "orderCount",
      key: "orderCount",
      align: "center",
    },
    {
      title: "Số kilomet",
      dataIndex: "totalDistance",
      key: "totalDistance",
      align: "center",
    },
  ];

  return (
    <div className="mt-[100px]">
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
          Thông Báo Lương và Lưu Ý Cho Shipper
        </h2>
        <p className="text-gray-800 mb-2">
          Chào anh/chị shipper của{" "}
          <span className="font-semibold text-blue-600">Seven Shop</span>
        </p>
        <div className="mt-4">
          <span className="mb-2.5 block">
            <span className="font-semibold">1. Lương cơ bản:</span> Lương của
            anh/chị được tính theo mức{" "}
            <span className="text-red-500 font-semibold">15,000 VND</span> cho
            mỗi km giao hàng thành công trong tháng.
          </span>
          <span className="mb-2.5 block">
            <span className="font-semibold">2. Thưởng tháng:</span> Nếu anh/chị
            đạt hoặc vượt{" "}
            <span className="text-red-500 font-semibold">150 km</span> giao hàng
            trong tháng, shop sẽ thưởng thêm{" "}
            <span className="text-red-500 font-semibold">500,000 VND</span> vào
            lương tháng đó.
          </span>
          <span className="mb-2.5 block">
            <span className="font-semibold">
              3. Lưu ý về thời gian nhận lương:
            </span>{" "}
            Nếu đến ngày cuối cùng của tháng mà anh/chị chưa nhận được lương,
            vui lòng liên hệ ngay với{" "}
            <span className="font-semibold text-blue-600">Seven Shop</span> qua
            email: <span className="text-blue-600">sevenshop@gmail.com</span> để
            được hỗ trợ kịp thời.
          </span>
          <span className="mb-2.5 block">
            <span className="font-semibold">
              4. Xác nhận sau khi nhận lương:
            </span>{" "}
            Sau khi anh/chị nhận được lương từ shop, vui lòng nhấn nút{" "}
            <span className="font-semibold text-blue-600">
              “Đã nhận được lương”
            </span>{" "}
            để xác nhận. Theo dõi và xác nhận số km: Anh/chị nên tự ghi nhận và
            kiểm tra tổng số km đã giao trong tháng.
          </span>
          <span className="mb-2.5 block">
            <span className="font-semibold">5. Nếu có bất kỳ sai sót nào:</span>{" "}
            Vui lòng báo ngay cho shop để được kiểm tra và điều chỉnh.{" "}
            <span className="font-semibold text-blue-600">Seven Shop</span> trân
            trọng cảm ơn sự nỗ lực và đóng góp của anh/chị trong công việc.
          </span>
          <span className="mb-2.5 block">
            Chúc anh/chị một tháng mới nhiều thành công và suôn sẻ!{" "}
            <span className="font-semibold">Trân trọng,</span>
          </span>
          <span className="font-semibold text-blue-600">Seven Shop</span>
        </div>
      </div>

      <Card
        title={`Bảng tính lương và thưởng tháng ${currentMonth}`}
        className="mt-[20px]"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Tổng quan">
              <p>
                <strong>Tổng đơn hàng đã giao:</strong>{" "}
                {salary_month?.salaryData?.totalOrders || "0"} ĐƠN
              </p>
              <p>
                <strong>Tổng số km:</strong>{" "}
                {salary_month?.salaryData?.totalDistance || "0"} KM
              </p>
              <p>
                <strong>Thưởng tháng:</strong>{" "}
                {salary_month?.salaryData?.monthlyBonus || "0"} (VND)
              </p>
              <p>
                <strong>Tổng lương:</strong>{" "}
                {salary_month?.salaryData?.totalPayment || "0"} (VND)
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Thành tích thưởng">
              <p>
                Hoàn thành 150km/tháng:{" "}
                {salary_month?.salaryData?.totalDistance >= 150
                  ? "Đã đạt"
                  : "Chưa đạt"}
              </p>
            </Card>
          </Col>
        </Row>

        <Divider />

        <div>
          <Card
            title="Bảng thống kê đơn hàng và quãng đường hàng ngày"
            className="mt-[20px]"
          >
            <Table
              dataSource={dailyData}
              columns={columns}
              pagination={false}
              rowKey="date"
            />
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Salary;
