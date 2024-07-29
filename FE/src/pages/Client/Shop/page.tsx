// src/components/IndexShops.tsx
import React, { useState } from "react";
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
    <div className="flex">
      <div className="w-1/4">
        <MenuShop onCategoryChange={handleCategoryChange} />
      </div>
      <div className="w-3/4">
        <Products_Shop categoryId={selectedCategoryId} />
      </div>
    </div>
  );
};

export default IndexShops;
