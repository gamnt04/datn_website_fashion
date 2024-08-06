// ColorFilter.tsx
import React from "react";

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
  const handleColorChange = (color: string) => {
    toggleColor(color);
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
          {colorOptions.map((color) => (
            <li key={color}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                {color}
              </label>
            </li>
          ))}
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
