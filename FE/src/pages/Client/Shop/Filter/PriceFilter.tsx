import React, { useState, useCallback } from "react";
import usePriceFilter from "../../../../common/hooks/Products/Filter/usePriceFilter";
import { SlArrowDown } from "react-icons/sl";
import useClickOutside from "../../../../common/hooks/Products/Filter/useClickOutside";

interface PriceFilterProps {
  onPriceChange: (priceRanges: { min: number; max: number }[]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
  const { selectedPriceRanges, handlePriceChange, resetPriceFilter } =
    usePriceFilter();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickOutside(() => setIsOpen(false));

  const isPriceRangeSelected = useCallback(
    (min: number, max: number) => {
      return selectedPriceRanges.some(
        (range) => range.min === min && range.max === max
      );
    },
    [selectedPriceRanges]
  );

  const handlePriceClick = useCallback(
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

  const getSelectedPriceLabels = () => {
    if (selectedPriceRanges.length === 0) {
      return "Giá";
    }
    return selectedPriceRanges
      .map((range) => {
        if (range.max === Infinity) {
          return `Trên $${Math.round(range.min / 1000)}K`;
        }
        return `$${Math.round(range.min / 1000)}K - $${Math.round(
          range.max / 1000
        )}K`;
      })
      .join(", ");
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        className="flex items-center justify-between w-40 p-2 text-gray-900 bg-[#EDEDED] rounded-md overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong className="font-semibold  overflow-hidden whitespace-nowrap flex-grow">
          {getSelectedPriceLabels()}
        </strong>
        <SlArrowDown
          className={`ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 p-3 mt-2 w-[900px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          <ul className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
            <li className="flex-shrink-0 w-1/5 max-w-[calc(20%-0.8rem)]">
              <button
                className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${
                  isPriceRangeSelected(50000, 150000) ? "bg-gray-100" : ""
                }`}
                onClick={() => handlePriceClick(50000, 150000)}
              >
                $50K - $150K
              </button>
            </li>
            <li className="flex-shrink-0 w-1/5 max-w-[calc(20%-0.8rem)]">
              <button
                className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${
                  isPriceRangeSelected(150001, 200000) ? "bg-gray-100" : ""
                }`}
                onClick={() => handlePriceClick(150001, 200000)}
              >
                $150K - $200K
              </button>
            </li>
            <li className="flex-shrink-0 w-1/5 max-w-[calc(20%-0.8rem)]">
              <button
                className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${
                  isPriceRangeSelected(200001, 300000) ? "bg-gray-100" : ""
                }`}
                onClick={() => handlePriceClick(200001, 300000)}
              >
                $200K - $300K
              </button>
            </li>
            <li className="flex-shrink-0 w-1/5 max-w-[calc(20%-0.8rem)]">
              <button
                className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${
                  isPriceRangeSelected(300001, Infinity) ? "bg-gray-100" : ""
                }`}
                onClick={() => handlePriceClick(300001, Infinity)}
              >
                Trên $300K
              </button>
            </li>
            <li className="w-full mt-4">
              <button
                className="text-blue-500 underline"
                onClick={handleResetClick}
              >
                Đặt lại bộ lọc giá
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
