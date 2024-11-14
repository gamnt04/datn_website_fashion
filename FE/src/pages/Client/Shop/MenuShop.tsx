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
  setSearch: (search: string) => void; // Thêm setSearch vào props
  selectedColors: string[]; // Prop cho selectedColors
  toggleColor: (color: string) => void; // Prop cho toggleColor
  resetColorFilter: () => void; // Prop cho resetColorFilter
  onColorChange: (colors: string[]) => void; // Prop cho onColorChange
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (sizes: string[]) => void;
}

const MenuShop: React.FC<MenuShopProps> = ({
  onCategorySelect,
  onPriceChange,
  setSearch,
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
  const { sizes: sizeOptions, loading, error } = useAttributes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCategoryChange = (selectedCategories: string[]) => {
    onCategorySelect(selectedCategories);
  };
  const handleColorSearch = (color: string) => {
    onColorChange([color]); // Chuyển màu sắc đã tìm kiếm đến onColorChange
  };
  return (
    <div className="hidden lg:block w-full flex flex-col my-10">
      <div className="space-x-4 mb-7 mt-3">
        <h1 className="text-2xl">Bộ Lọc Sản Phẩm</h1>
      </div>

      {/* Bộ lọc danh mục */}
      <div className="w-full bg-gray-50">
        <CategoryFilter
          categories={categoryData || []}
          onCategorySelect={handleCategoryChange}
        />
      </div>

      {/* Bộ lọc giá */}
      <div className="w-full bg-gray-50 mt-2">
        <PriceFilter onPriceChange={onPriceChange} />
      </div>

      {/* Bộ lọc màu */}
      <div className="w-full bg-gray-50 mt-2">
        <ColorFilter
          selectedColor={selectedColors.join(", ")} // Truyền selectedColors vào
          onColorSearch={handleColorSearch} // Truyền hàm tìm kiếm màu sắc
        />
      </div>

      {/* Bộ lọc kích thước */}
      <div className="w-full bg-gray-50 mt-2">
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
