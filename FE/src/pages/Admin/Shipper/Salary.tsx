import React from "react";
import { Card, Table, Row, Col, Divider } from "antd";
const Salary = ({ salaryData }) => {
  const columns = [
    { title: "Ngày", dataIndex: "orderId", key: "orderId" },
    { title: "Số kilomet", dataIndex: "distance", key: "distance" },
    { title: "Tỷ lệ lương/km", dataIndex: "ratePerKm", key: "ratePerKm" },
    { title: "Lương ngày", dataIndex: "salary", key: "salary" },
  ];
  return (
    <div className="mt-[100px]">
      <h1 className="text-4xl">Tổng quan lương tháng:</h1>
      <Card title="Bảng tính lương và thưởng" className="mt-[20px]">
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Tổng quan">
              <p>
                <strong>Tổng lương cơ bản:</strong> {salaryData?.totalSalary}{" "}
                VND
              </p>
              <p>
                <strong>Thưởng tuần:</strong> {salaryData?.weeklyBonus} VND
              </p>
              <p>
                <strong>Thưởng tháng:</strong> {salaryData?.monthlyBonus} VND
              </p>
              <p>
                <strong>Tổng lương cuối cùng:</strong>{" "}
                {salaryData?.totalPayment} VND
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Thành tích thưởng">
              <p>
                Hoàn thành 100km/tuần:{" "}
                {salaryData?.totalWeeklyDistance >= 100 ? "Đã đạt" : "Chưa đạt"}
              </p>
              <p>
                Hoàn thành 250km/tháng:{" "}
                {salaryData?.totalMonthlyDistance >= 250
                  ? "Đã đạt"
                  : "Chưa đạt"}
              </p>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Table
          dataSource={salaryData?.orders}
          columns={columns}
          pagination={false}
          title={() => "Chi tiết đơn hàng"}
          rowKey="orderId"
        />
      </Card>
    </div>
  );
};

export default Salary;
