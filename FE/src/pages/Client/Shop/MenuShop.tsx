import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import PriceFilter from "./Filter/PriceFilter";
import ColorFilter from "./Filter/ColorFilter";
import SizeFilter from "./Filter/SizeFilter";
import useCategoryQuery from "../../../common/hooks/Category/useCategoryQuery";
import useAttributes from "../../../common/hooks/Attributes/useAttributesQuery";

interface MenuShopProps {
  onCategorySelect: (id: string | null) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
  selectedColors: string[];
  toggleColor: (color: string) => void;
  resetColorFilter: () => void;
  onColorChange: (colors: string[]) => void;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (sizes: string[]) => void;
}

const MenuShop: React.FC<MenuShopProps> = ({
  onCategorySelect,
  onPriceChange,
  setSearch,
  setSort,
  selectedColors,
  toggleColor,
  resetColorFilter,
  onColorChange,
  selectedSizes,
  toggleSize,
  resetSizeFilter,
  onSizeChange,
}) => {
  const { data: categoryData } = useCategoryQuery();
  const {
    colors: colorOptions,
    sizes: sizeOptions,
    loading,
    error,
  } = useAttributes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hidden lg:block w-full h-auto flex flex-col my-10 rounded overflow-hidden">
      <CategoryFilter
        categories={categoryData || []}
        onCategorySelect={onCategorySelect}
      />
      <PriceFilter onPriceChange={onPriceChange} />
      <ColorFilter
        selectedColors={selectedColors}
        toggleColor={toggleColor}
        resetColorFilter={resetColorFilter}
        onColorChange={onColorChange}
        colorOptions={colorOptions}
      />
      <SizeFilter
        selectedSizes={selectedSizes}
        toggleSize={toggleSize}
        resetSizeFilter={resetSizeFilter}
        onSizeChange={onSizeChange}
        sizeOptions={sizeOptions}
      />
    </div>
  );
};

export default MenuShop;
