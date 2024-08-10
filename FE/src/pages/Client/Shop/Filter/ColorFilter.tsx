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
        className="flex items-center py-3 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong className="">
          {getSelectedColorLabel()}
        </strong>
        <SlArrowDown
          size={10}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 p-3 w-[400px] bg-white border border-gray-200 rounded overflow-hidden">
          <ul className="grid grid-cols-4 gap-1 max-h-60 overflow-y-auto">
            {colorOptions.length > 0 ? (
              colorOptions.map((color) => (
                <li key={color}>
                  <button
                    className={`w-full text-left p-2 rounded hover:bg-gray-100 ${selectedColors.includes(color) ? "bg-gray-100" : ""}`}
                    onClick={() => handleColorSelect(color)}
                  >
                    {color}
                  </button>
                </li>
              ))
            ) : (
              <p className="px-4 py-2">No colors available</p>
            )}
          </ul>
          <div className="w-full mt-4 flex justify-center">
            <button
              className="text-blue-500 underline"
              onClick={() => {
                resetColorFilter();
                onColorChange([]); // Reset the filter
              }}
            >
              Đặt lại
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ColorFilter;
