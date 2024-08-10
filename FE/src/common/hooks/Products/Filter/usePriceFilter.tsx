import { useState } from "react";

interface PriceRange {
  min: number;
  max: number;
}

const usePriceFilter = () => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>(
    []
  );

  const handlePriceChange = (min: number | null, max: number | null) => {
    if (min === null || max === null) {
      setSelectedPriceRanges([]);
    } else {
      setSelectedPriceRanges((prev) => {
        const newRange = { min, max };
        const isRangeSelected = prev.some(
          (range) => range.min === min && range.max === max
        );

        if (isRangeSelected) {
          return prev.filter(
            (range) => !(range.min === min && range.max === max)
          );
        } else {
          return [...prev, newRange];
        }
      });
    }
  };

  const resetPriceFilter = () => {
    setSelectedPriceRanges([]);
  };

  return {
    selectedPriceRanges,
    handlePriceChange,
    resetPriceFilter,
  };
};

export default usePriceFilter;
