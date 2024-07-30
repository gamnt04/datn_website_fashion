// src/components/IndexShops.tsx
import { useState } from "react";
import MenuShop from "./MenuShop";
import Products_Shop from "./Products";

const IndexShops = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId ?? undefined);
  };

  return (
    <div className="mt-10">
      <div className="text-sm py-6 bg-gray-100 font-medium px-[2.5%] rounded">
        Home &#10148; Products
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="lg:w-[19%] lg:block order-1">
          <MenuShop onCategoryChange={handleCategoryChange} />
        </div>
        <div className="lg:w-[78%] order-2">
          <Products_Shop categoryId={selectedCategoryId} />
        </div>
      </div>
    </div>
  );
};

export default IndexShops;
