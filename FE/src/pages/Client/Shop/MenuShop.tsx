// MenuShop.tsx
import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import { ICategory } from "../../../common/interfaces/Category";
import PriceFilter from "./Filter/PriceFilter";
import ColorFilter from "./Filter/ColorFilter";
import SizeFilter from "./Filter/SizeFilter";

const MenuShop: React.FC<{
  categories?: ICategory[];
  onCategorySelect: (id: string | null) => void;
}> = ({ categories = [], onCategorySelect }) => {
  return (
    <div className="hidden lg:block w-full h-auto flex flex-col my-10  rounded overflow-hidden">
      <CategoryFilter
        categories={categories}
        onCategorySelect={onCategorySelect}
      />
      <PriceFilter />
      <ColorFilter />
      <SizeFilter />
    </div>
  );
};

export default MenuShop;
