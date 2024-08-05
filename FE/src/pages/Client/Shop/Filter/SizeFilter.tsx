// SizeFilter.tsx
import React from "react";

interface SizeFilterProps {
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (name_size: string[]) => void; // Update to accept an array of sizes
}

const SizeFilter: React.FC<SizeFilterProps> = ({
  selectedSizes,
  toggleSize,
  resetSizeFilter,
  onSizeChange,
}) => {
  const handleSizeChange = (size: string) => {
    toggleSize(size);
    // Update the size list and call onSizeChange with the new list
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    onSizeChange(updatedSizes);
  };

  return (
    <div className="py-2">
      <details open>
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-gray-100">
          <strong>Sizes</strong>
        </summary>
        <ul className="space-y-1 py-4">
          {/* Example size options */}
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes("XL")}
                onChange={() => handleSizeChange("XL")}
              />
              Size XL
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedSizes.includes("M")}
                onChange={() => handleSizeChange("M")}
              />
              Size M
            </label>
          </li>
          {/* Add more sizes as needed */}
          <button
            className="mt-4 text-blue-500"
            onClick={() => {
              resetSizeFilter();
              onSizeChange([]); // Reset the filter
            }}
          >
            Reset Size Filter
          </button>
        </ul>
      </details>
    </div>
  );
};

export default SizeFilter;
