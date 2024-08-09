import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import PriceFilter from "./Filter/PriceFilter";
import ColorFilter from "./Filter/ColorFilter";
import SizeFilter from "./Filter/SizeFilter";
import useCategoryQuery from "../../../common/hooks/Category/useCategoryQuery";
import useAttributes from "../../../common/hooks/Attributes/useAttributesQuery";
import TimeFilter from "./Filter/TimeFilter";

interface MenuShopProps {
  onCategorySelect: (ids: string[]) => void; // Cập nhật kiểu ở đây
  onPriceChange: (priceRanges: { min: number; max: number }[]) => void;
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

  const handleCategoryChange = (selectedCategories: string[]) => {
    onCategorySelect(selectedCategories); // Gọi hàm với mảng các ID
  };

  return (
    <div className="hidden lg:flex flex-row h-auto justify-start my-10 ml-5 mr-[50%] p-2 space-x-2">
      <div className="w-52">
        <TimeFilter
          onCategorySelect={function (ids: string[]): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="w-52">
        <CategoryFilter
          categories={categoryData || []}
          onCategorySelect={handleCategoryChange} // Truyền vào hàm mới
        />
      </div>

      <div className=" w-40">
        <PriceFilter onPriceChange={onPriceChange} />
      </div>
      <div className=" w-40">
        <ColorFilter
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          resetColorFilter={resetColorFilter}
          onColorChange={onColorChange}
          colorOptions={colorOptions}
        />
      </div>
      <div className=" w-28">
        <SizeFilter
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={onSizeChange}
          sizeOptions={sizeOptions}
        />
      </div>
    </div>
  );
};

export default MenuShop;
