import React from "react";
import useShipperDailyShipCount from "../../../common/hooks/Shipper/useDailyShipCount"; // Import custom hook

const ShipperDashboard = () => {
  const today = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const { shipCount, loading, error } = useShipperDailyShipCount(today);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Tổng đơn ship trong ngày {today}</h3>
      <p>{shipCount ? shipCount : 0} đơn hàng đã ship thành công.</p>
    </div>
  );
};

export default ShipperDashboard;
