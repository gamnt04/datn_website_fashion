import { useState } from "react";

const usePriceFilter = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  const handlePriceChange = (min: number | null, max: number | null) => {
    setSelectedPriceRange({ min, max });
  };

  const resetPriceFilter = () => {
    setSelectedPriceRange({ min: null, max: null });
  };

  return {
    selectedPriceRange,
    handlePriceChange,
    resetPriceFilter,
  };
};

export default usePriceFilter;
