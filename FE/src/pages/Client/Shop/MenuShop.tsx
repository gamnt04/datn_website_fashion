import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import PriceFilter from "./Filter/PriceFilter";
import ColorFilter from "./Filter/ColorFilter"; // Import ColorFilter
import SizeFilter from "./Filter/SizeFilter";
import useAttributes from "../../../common/hooks/Attributes/useAttributesQuery";
import { useCategoryQuery } from "../../../common/hooks/Category/useCategoryQuery";

interface MenuShopProps {
  onCategorySelect: (ids: string[]) => void;
  onPriceChange: (priceRanges: { min: number; max: number }[]) => void;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (sizes: string[]) => void;
}

const MenuShop: React.FC<MenuShopProps> = ({
  onCategorySelect,
  onPriceChange,
  selectedColors,
  onColorChange,
  selectedSizes,
  toggleSize,
  resetSizeFilter,
  onSizeChange,
}) => {
  const { data: categoryData } = useCategoryQuery();
  const { sizes, loading, error } = useAttributes();
  console.log("lọc size :", sizes);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCategoryChange = (selectedCategories: string[]) => {
    onCategorySelect(selectedCategories);
  };
  const handleColorSearch = (color: string) => {
    onColorChange([color]); // Chuyển màu sắc đã tìm kiếm đến onColorChange
  };
  return (
    <div className="lg:block w-full flex flex-col my-10">
      {/* Bộ lọc danh mục */}
      <div className="w-full bg-gray-50 *:rounded">
        <CategoryFilter
          categories={categoryData || []}
          onCategorySelect={handleCategoryChange}
        />
      </div>

      {/* Bộ lọc giá */}
      <div className="w-full bg-gray-50 mt-2 *:rounded">
        <PriceFilter onPriceChange={onPriceChange} />
      </div>

      {/* Bộ lọc màu
      <div className="w-full bg-gray-50 mt-2 *:rounded">
        <ColorFilter
          selectedColor={selectedColors.join(", ")} // Truyền selectedColors vào
          onColorSearch={handleColorSearch} // Truyền hàm tìm kiếm màu sắc
        />
      </div> */}

      {/* Bộ lọc kích thước */}
      <div className="w-full bg-gray-50 mt-2 *:rounded">
        <SizeFilter
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={onSizeChange}
          sizeOptions={sizes}
        />
      </div>
    </div>
  );
};

export default MenuShop;
