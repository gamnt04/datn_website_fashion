import React from "react";
import usePriceFilter from "../../../../common/hooks/Products/Filter/usePriceFilter";

interface PriceFilterProps {
  onPriceChange: (min: number | null, max: number | null) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
  const { selectedPriceRange, handlePriceChange, resetPriceFilter } =
    usePriceFilter();

  const isPriceRangeSelected = (min: number, max: number) => {
    return (
      (selectedPriceRange.min === min && selectedPriceRange.max === max) ||
      (selectedPriceRange.min === min &&
        selectedPriceRange.max === Infinity &&
        max === Infinity)
    );
  };

  const handleCheckboxChange = (min: number, max: number) => {
    if (isPriceRangeSelected(min, max)) {
      // Nếu khoảng giá đã được chọn, bỏ chọn khoảng giá
      handlePriceChange(null, null);
      onPriceChange(null, null);
    } else {
      // Nếu khoảng giá chưa được chọn, chọn khoảng giá mới
      handlePriceChange(min, max);
      onPriceChange(min, max);
    }
  };

  return (
    <div className="border-b py-2">
      <details open>
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-gray-100">
          <strong>Giá</strong>
        </summary>
        <div className="flex flex-col py-4">
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPriceRangeSelected(50000, 150000)}
                onChange={() => handleCheckboxChange(50000, 150000)}
              />
              $50K - $150K
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPriceRangeSelected(150001, 200000)}
                onChange={() => handleCheckboxChange(150001, 200000)}
              />
              $150K - $200K
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPriceRangeSelected(200001, 300000)}
                onChange={() => handleCheckboxChange(200001, 300000)}
              />
              $200K - $300K
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPriceRangeSelected(300001, Infinity)}
                onChange={() => handleCheckboxChange(300001, Infinity)}
              />
              Above $300K
            </label>
          </div>
          <button
            className="mt-4 text-blue-500"
            onClick={() => {
              resetPriceFilter();
              onPriceChange(null, null);
            }}
          >
            Reset Price Filter
          </button>
        </div>
      </details>
    </div>
  );
};

export default PriceFilter;
