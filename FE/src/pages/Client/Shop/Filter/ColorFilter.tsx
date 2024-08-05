// ColorFilter.tsx
import React from "react";

interface ColorFilterProps {
  selectedColors: string[];
  toggleColor: (color: string) => void;
  resetColorFilter: () => void;
  onColorChange: (colors: string[]) => void; // Update to accept an array of colors
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  selectedColors,
  toggleColor,
  resetColorFilter,
  onColorChange,
}) => {
  const handleColorChange = (color: string) => {
    toggleColor(color);
    // Update the color list and call onColorChange with the new list
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onColorChange(updatedColors);
  };

  return (
    <div className="border-b py-2">
      <details open>
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-gray-100">
          <strong>Colors</strong>
        </summary>
        <ul className="space-y-1 py-4">
          {/* Example color options */}
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("Đỏ")}
                onChange={() => handleColorChange("Đỏ")}
              />
              Đỏ
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("Xanh")}
                onChange={() => handleColorChange("Xanh")}
              />
              Xanh
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("Đen")}
                onChange={() => handleColorChange("Đen")}
              />
              Đen
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedColors.includes("Vàng")}
                onChange={() => handleColorChange("Vàng")}
              />
              Vàng
            </label>
          </li>
          {/* Add more colors as needed */}
          <button
            className="mt-4 text-blue-500"
            onClick={() => {
              resetColorFilter();
              onColorChange([]); // Reset the filter
            }}
          >
            Reset Color Filter
          </button>
        </ul>
      </details>
    </div>
  );
};

export default ColorFilter;
