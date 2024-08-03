import React from "react";
import usePriceFilter from "../../../../common/hooks/Products/Filter/usePriceFilter";

const PriceFilter: React.FC<{
  onPriceChange: (min: number | null, max: number | null) => void;
}> = ({ onPriceChange }) => {
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
      return;
    }
    handlePriceChange(min, max);
    onPriceChange(min, max);
  };

  return (
    <div className="border-b py-2">
      <details
        className="group [&_summary::-webkit-details-marker]:hidden *:px-4"
        open
      >
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-[#EDEDED]">
          <strong>Price</strong>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
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
