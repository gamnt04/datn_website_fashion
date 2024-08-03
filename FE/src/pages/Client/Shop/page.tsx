import React, { useState } from "react";
import MenuShop from "./MenuShop";
import Products_Shop from "./Products";

const IndexShops: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const handleCategorySelect = (id: string | null) => {
    setCategoryId(id);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="lg:mt-[40px] mt-[60px]">
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        Home &#10148; Products &#10148; All
      </div>
      <div className="xl:grid grid-cols-[21%_76%] justify-between">
        <MenuShop
          onCategorySelect={handleCategorySelect}
          onPriceChange={handlePriceChange}
          setSearch={setSearch}
          setSort={setSort}
        />
        <div className="mb:w-[95%] xl:w-full mb:mx-[2.5%] xl:mx-0">
          <Products_Shop
            selectedCategoryId={categoryId}
            minPrice={minPrice}
            maxPrice={maxPrice}
            search={search}
            sort={sort}
          />
        </div>
        {/* <Get_in_touch /> */}
      </div>
    </div>
  );
};

export default IndexShops;
