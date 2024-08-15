import { useState } from "react";
import MenuShop from "./MenuShop";
import Products_Shop from "./Products";

const IndexShops = () => {
  const [cate_id, setCategoryId] = useState<string[]>([]); // Sửa kiểu thành mảng string
  const [priceRanges, setPriceRanges] = useState<
    { min: number; max: number }[]
  >([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const handleCategorySelect = (id: string[]) => {
    setCategoryId(id); // Cập nhật toàn bộ mảng ID
  };

  const handlePriceChange = (priceRanges: { min: number; max: number }[]) => {
    setPriceRanges(priceRanges);
  };

  const handleColorChange = (colors: string[]) => setSelectedColors(colors);

  const handleSizeChange = (sizes: string[]) => setSelectedSizes(sizes);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const resetColorFilter = () => setSelectedColors([]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetSizeFilter = () => setSelectedSizes([]);

  return (
    <div className="lg:mt-[40px] mt-[60px]">
      <div className="xl:w-[1440px] w-[95vw] mx-auto">
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          Trang chủ &#10148; Sản phẩm &#10148; Tất cả
        </div>
        <MenuShop
          onCategorySelect={handleCategorySelect}
          onPriceChange={handlePriceChange}
          setSearch={() => {}}
          setSort={setSortOption}
          sortOption={sortOption}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          resetColorFilter={resetColorFilter}
          onColorChange={handleColorChange}
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={handleSizeChange}
        />
        <Products_Shop
          cate_id={cate_id} // Truyền mảng ID
          priceRanges={priceRanges}
          selectedColors={selectedColors}
          selectedSizes={selectedSizes}
          sortOption={sortOption}
        />
      </div>

      {/* <Get_in_touch /> */}
    </div>
  );
};

export default IndexShops;
