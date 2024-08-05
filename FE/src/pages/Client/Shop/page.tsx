import React, { useState } from "react";
import MenuShop from "./MenuShop";
import Products_Shop from "./Products";

const IndexShops = () => {
  const [category_id, setCategoryId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleCategorySelect = (id: string | null) => setCategoryId(id);
  const handlePriceChange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleColorChange = (colors: string[]) => setSelectedColors(colors);
  const handleSizeChange = (name_size: string[]) => setSelectedSizes(name_size);

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
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        Home &#10148; Products &#10148; All
      </div>
      <div className="xl:grid grid-cols-[21%_76%] justify-between">
        <MenuShop
          onCategorySelect={handleCategorySelect}
          onPriceChange={handlePriceChange}
          setSearch={() => {}}
          setSort={() => {}}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          resetColorFilter={resetColorFilter}
          onColorChange={handleColorChange}
          selectedSizes={selectedSizes}
          toggleSize={toggleSize}
          resetSizeFilter={resetSizeFilter}
          onSizeChange={handleSizeChange}
        />
        <div className="mb:w-[95%] xl:w-full mb:mx-[2.5%] xl:mx-0">
          <Products_Shop
            category_id={category_id}
            minPrice={minPrice}
            maxPrice={maxPrice}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
          />
        </div>
        {/* <Get_in_touch /> */}
      </div>
    </div>
  );
};

export default IndexShops;
