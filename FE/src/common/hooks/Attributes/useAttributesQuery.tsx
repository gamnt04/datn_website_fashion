import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../../configs/axios";

interface UseAttributesResult {
  colors: string[];
  sizes: string[];
  loading: boolean;
  error: string | null;
}

const useAttributes = (): UseAttributesResult => {
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await instance.get(
          "/thuoc_tinh/lay_tat_ca_thuoc_tinh"
        );
        const attributes = response.data;

        console.log("Dữ liệu trả về từ API:", attributes); // Kiểm tra dữ liệu trả về

        // Kiểm tra nếu dữ liệu trả về là đối tượng và có thuộc tính colors và sizes
        if (
          attributes &&
          attributes.colors &&
          Array.isArray(attributes.colors) &&
          attributes.sizes &&
          Array.isArray(attributes.sizes)
        ) {
          const colorAttributes = attributes.colors;
          const sizeAttributes = attributes.sizes;

          // Log để kiểm tra kết quả
          console.log("Danh sách màu sắc:", colorAttributes);
          console.log("Danh sách kích thước:", sizeAttributes);

          // Lưu vào state
          setColors(colorAttributes);
          setSizes(sizeAttributes);
        } else {
          setError("Dữ liệu trả về không đúng định dạng.");
          console.error("Dữ liệu không đúng định dạng.");
        }

        setLoading(false);
      } catch (err) {
        // Xử lý lỗi từ Axios hoặc lỗi khác
        if (axios.isAxiosError(err)) {
          setError(err.message); // Lỗi từ axios
        } else {
          setError("An unexpected error occurred"); // Lỗi bất ngờ
        }
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []); // Chạy một lần khi component mount

  return {
    colors, // Trả về màu sắc đã lưu trong state
    sizes, // Trả về kích thước đã lưu trong state
    loading,
    error,
  };
};

export default useAttributes;
