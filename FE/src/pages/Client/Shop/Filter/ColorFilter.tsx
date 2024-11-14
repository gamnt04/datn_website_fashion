import React, { useState } from "react";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons"; // Import các icon từ Ant Design
import { SlArrowDown } from "react-icons/sl";

interface ColorFilterProps {
  selectedColor: string; // Được truyền từ MenuShop
  onColorSearch: (color: string) => void; // Được truyền từ MenuShop
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  selectedColor,
  onColorSearch,
}) => {
  const [colorInput, setColorInput] = useState(selectedColor);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInput(event.target.value);
  };

  const handleSearch = () => {
    onColorSearch(colorInput); // Gửi tên màu sắc tìm kiếm lên bố
  };

  const handleClear = () => {
    setColorInput(""); // Xóa nội dung input
    onColorSearch(""); // Gửi giá trị rỗng lên bố (có thể dùng để reset màu sắc)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(); // Gọi hàm tìm kiếm khi nhấn Enter
    }
  };

  return (
    <div className="space-y-2 border border-gray-200">
      <details className="group">
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900">
          <strong className="ml-3">Tìm kiếm màu</strong>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180 mr-4">
            <SlArrowDown />
          </span>
        </summary>
        <div className="pt-2">
          <div className="relative flex items-center w-52 p-2">
            {/* Đặt position relative cho div để chứa các icon */}
            <input
              type="text"
              value={colorInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Thêm sự kiện keydown cho ô input
              className="border p-2 rounded-md flex-grow pl-10 w-20" // Thêm padding-left để không bị chồng lên icon
              placeholder="Nhập tên màu"
            />
            {/* Icon tìm kiếm trong input */}
            <button
              onClick={handleSearch}
              className="absolute left-4 text-gray-500"
            >
              <SearchOutlined />
            </button>
            {/* Icon "X" ngoài input */}
            {colorInput && (
              <button
                onClick={handleClear}
                className="absolute -right-3 text-gray-500"
              >
                <CloseCircleOutlined />
              </button>
            )}
          </div>
        </div>
      </details>
    </div>
  );
};

export default ColorFilter;
