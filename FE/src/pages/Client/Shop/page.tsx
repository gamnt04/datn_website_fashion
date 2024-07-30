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
    <div className="flex gap-6 flex-wrap">
      <div className="lg:w-[19%] lg:block order-1">
        <MenuShop onCategoryChange={handleCategoryChange} />
      </div>
      <div className="lg:w-[79%] order-2">
        <Products_Shop categoryId={selectedCategoryId} />
      </div>
    </div>
  );
};

export default IndexShops;
