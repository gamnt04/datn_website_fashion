import React from "react";
import { SlArrowDown } from "react-icons/sl";

// Xóa hàm Convert_Color vì không cần xác định lớp màu nữa

interface ColorFilterProps {
  colorOptions: string[];
  selectedColors: string[];
  toggleColor: (color: string) => void;
  resetColorFilter: () => void;
  onColorChange: (colors: string[]) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colorOptions,
  selectedColors,
  toggleColor,
  resetColorFilter,
  onColorChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Xử lý sự kiện chọn màu
  const handleColorSelect = (color: string) => {
    toggleColor(color);
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onColorChange(updatedColors);
  };

  return (
    <div className="relative border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-4 text-gray-900 rounded-md"
      >
        <strong>Màu </strong>
        <span
          className={`shrink-0 transition duration-300 ${
            isOpen ? "-rotate-180" : ""
          }`}
        >
          <SlArrowDown />
        </span>
      </button>

      {isOpen && (
        <div className="w-full bg-white rounded-md">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {colorOptions.length > 0 ? (
              colorOptions.map((color) => {
                return (
                  <li key={color} className="flex items-center">
                    <button
                      className={`w-full text-left p-2 rounded flex items-center space-x-2 hover:bg-gray-100 ${
                        selectedColors.includes(color) ? "bg-gray-100" : ""
                      }`}
                      onClick={() => handleColorSelect(color)}
                    >
                      {/* Không cần xác định màu từ lớp CSS */}
                      <span
                        className={`w-6 h-6 rounded-full`}
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="ml-2 flex-1 truncate whitespace-normal">
                        {color}
                      </span>
                    </button>
                  </li>
                );
              })
            ) : (
              <p className="px-4 py-2">Không có màu nào khả dụng</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
