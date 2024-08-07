// SizeFilter.tsx
import React from "react";

interface SizeFilterProps {
  sizeOptions: string[];
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (sizes: string[]) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({
  sizeOptions,
  selectedSizes,
  toggleSize,
  resetSizeFilter,
  onSizeChange,
}) => {
  const handleSizeChange = (size: string) => {
    toggleSize(size);
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
          {sizeOptions.map((size) => (
            <li key={size}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                Size {size}
              </label>
            </li>
          ))}
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
