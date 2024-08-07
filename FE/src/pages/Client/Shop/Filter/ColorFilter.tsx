import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import useClickOutside from "../../../../common/hooks/Products/Filter/useClickOutside"; // Đảm bảo đường dẫn đúng với vị trí của hook

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
  const [isOpen, setIsOpen] = useState(false);

  // Sử dụng hook để theo dõi click ngoài
  const ref = useClickOutside(() => setIsOpen(false));

  const handleColorSelect = (color: string) => {
    toggleColor(color);
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onColorChange(updatedColors);
  };

  const getSelectedColorLabel = () => {
    if (selectedColors.length === 0) {
      return "Màu";
    }
    if (selectedColors.length === 1) {
      return `Màu: ${selectedColors[0]}`;
    }
    return `Màu: ${selectedColors.join(", ")}`;
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        className="flex items-center justify-between w-40 p-2 text-gray-900 bg-[#EDEDED] rounded-md overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap flex-grow">
          {getSelectedColorLabel()}
        </strong>
        <SlArrowDown
          className={`ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 p-3 mt-2 w-[800px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          <ul className="flex flex-wrap gap-4 max-h-60 overflow-y-auto">
            {colorOptions.length > 0 ? (
              colorOptions.map((color) => (
                <li key={color} className="w-1/5 max-w-[calc(20%-0.8rem)]">
                  <button
                    className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${
                      selectedColors.includes(color) ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleColorSelect(color)}
                  >
                    {color}
                  </button>
                </li>
              ))
            ) : (
              <p className="px-4 py-2">No colors available</p>
            )}
            <li className="w-full mt-4">
              <button
                className="text-blue-500 underline"
                onClick={() => {
                  resetColorFilter();
                  onColorChange([]); // Reset the filter
                }}
              >
                Đặt lại bộ lọc màu
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColorFilter;
