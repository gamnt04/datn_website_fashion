// src/components/MenuShop.tsx
import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import ColorFilter from "./Filter/ColorFilter";
import PriceFilter from "./Filter/PriceFilter";
import SizeFilter from "./Filter/SizeFilter";

interface MenuShopProps {
  onCategoryChange: (categoryId: string | null) => void;
}

const MenuShop: React.FC<MenuShopProps> = ({ onCategoryChange }) => {
  return (
    <div>
      <div className="hidden lg:block w-full h-auto flex flex-col my-10 shadow-xl rounded overflow-hidden">
        <CategoryFilter onCategoryChange={onCategoryChange} />
        <PriceFilter />
        <ColorFilter />
        <SizeFilter />
      </div>
    </div>
  );
};

export default MenuShop;
