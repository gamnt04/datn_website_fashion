import React, { useState, useCallback } from "react";
import usePriceFilter from "../../../../common/hooks/Products/Filter/usePriceFilter";
import { SlArrowDown } from "react-icons/sl";

interface PriceFilterProps {
  onPriceChange: (priceRanges: { min: number; max: number }[]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
  const { selectedPriceRanges, handlePriceChange, resetPriceFilter } =
    usePriceFilter();

  const [isOpen, setIsOpen] = useState(false);

  const isPriceRangeSelected = useCallback(
    (min: number, max: number) => {
      return selectedPriceRanges.some(
        (range) => range.min === min && range.max === max
      );
    },
    [selectedPriceRanges]
  );

  const handlePriceChangeToggle = useCallback(
    (min: number, max: number) => {
      handlePriceChange(min, max);
      const newPriceRanges = selectedPriceRanges.some(
        (range) => range.min === min && range.max === max
      )
        ? selectedPriceRanges.filter(
            (range) => !(range.min === min && range.max === max)
          )
        : [...selectedPriceRanges, { min, max }];

      onPriceChange(newPriceRanges);
    },
    [handlePriceChange, onPriceChange, selectedPriceRanges]
  );

  const handleResetClick = useCallback(() => {
    resetPriceFilter();
    onPriceChange([]);
  }, [resetPriceFilter, onPriceChange]);


  return (
    <div className="border border-gray-200">
      <details
        className="group [&_summary::-webkit-details-marker]:hidden *:px-4"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900">
          <strong>Giá </strong>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <SlArrowDown />
          </span>
        </summary>
        {isOpen && (
          <div className="w-full bg-white rounded-md">
            <div className="py-5 px-3">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="price-0-150k"
                  checked={isPriceRangeSelected(0, 150000)}
                  onChange={() => handlePriceChangeToggle(0, 150000)}
                  className="mr-2"
                />
                <label htmlFor="price-0-150k" className="text-gray-700 text-lg">
                  $0K - $150K
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="price-150k-200k"
                  checked={isPriceRangeSelected(150001, 200000)}
                  onChange={() => handlePriceChangeToggle(150001, 200000)}
                  className="mr-2"
                />
                <label
                  htmlFor="price-150k-200k"
                  className="text-gray-700 text-lg"
                >
                  $150K - $200K
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="price-200k-300k"
                  checked={isPriceRangeSelected(200001, 300000)}
                  onChange={() => handlePriceChangeToggle(200001, 300000)}
                  className="mr-2"
                />
                <label
                  htmlFor="price-200k-300k"
                  className="text-gray-700 text-lg"
                >
                  $200K - $300K
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="price-300k-above"
                  checked={isPriceRangeSelected(300001, Infinity)}
                  onChange={() => handlePriceChangeToggle(300001, Infinity)}
                  className="mr-2"
                />
                <label
                  htmlFor="price-300k-above"
                  className="text-gray-700 text-lg"
                >
                  Trên $300K
                </label>
              </div>
            </div>
          </div>
        )}
      </details>
    </div>
  );
};

export default PriceFilter;
