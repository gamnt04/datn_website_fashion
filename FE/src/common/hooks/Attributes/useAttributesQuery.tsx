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
        const { attributesData } = response.data; // Truy cập vào thuộc tính `attributesData`

        console.log("Dữ liệu trả về từ API:", attributesData); // Kiểm tra dữ liệu trả về

        // Kiểm tra nếu dữ liệu trả về là mảng và có ít nhất một đối tượng
        if (Array.isArray(attributesData) && attributesData.length > 0) {
          const colorsSet = new Set<string>(); // Dùng Set để lưu màu sắc duy nhất
          const sizesSet = new Set<string>(); // Dùng Set để lưu kích thước duy nhất

          // Lặp qua dữ liệu để lấy màu sắc và kích thước
          attributesData.forEach((attribute: any) => {
            if (Array.isArray(attribute.values)) {
              attribute.values.forEach((value: any) => {
                if (value.color) {
                  colorsSet.add(value.color); // Thêm màu sắc vào Set
                }

                if (Array.isArray(value.size)) {
                  value.size.forEach((size: string) => {
                    sizesSet.add(size); // Thêm kích thước vào Set
                  });
                }
              });
            }
          });

          // Chuyển Set thành mảng và lưu vào state
          setColors(Array.from(colorsSet));
          setSizes(Array.from(sizesSet));
        } else {
          setError("Dữ liệu trả về không đúng định dạng.");
          console.error(
            "Dữ liệu không có thuộc tính attributesData hoặc không phải là mảng."
          );
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
