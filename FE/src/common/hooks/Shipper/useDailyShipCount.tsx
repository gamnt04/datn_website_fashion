import { useState, useEffect } from "react";
import instance from "../../../configs/axios";

const useShipperDailyShipCount = (date: any) => {
  const [shipCount, setShipCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipCount = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Giả sử bạn đang lưu token ở localStorage
        const response = await instance.get(
          `/shippers/dailyShipCount/${date}`, // API để lấy dữ liệu đơn hàng của shipper
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token để backend xác thực shipper
            },
          }
        );
        setShipCount(response.data.shipCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Gọi hàm fetch khi date thay đổi
    if (date) {
      fetchShipCount();
    }
  }, [date]);

  return { shipCount, loading, error };
};

export default useShipperDailyShipCount;
