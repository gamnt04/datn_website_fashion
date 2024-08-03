import React from "react";
import CategoryFilter from "./Filter/CategoryFilter";
import PriceFilter from "./Filter/PriceFilter";
import ColorFilter from "./Filter/ColorFilter";
import SizeFilter from "./Filter/SizeFilter";
import useCategoryQuery from "../../../common/hooks/Category/useCategoryQuery";

interface MenuShopProps {
  onCategorySelect: (id: string | null) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  setSearch: (search: string) => void;
  setSort: (sort: string) => void;
}

const MenuShop: React.FC<MenuShopProps> = ({
  onCategorySelect,
  onPriceChange,
  setSearch,
  setSort,
}) => {
  const { data } = useCategoryQuery();

  return (
    <div className="hidden lg:block w-full h-auto flex flex-col my-10 rounded overflow-hidden">
      <CategoryFilter categories={data} onCategorySelect={onCategorySelect} />
      <PriceFilter onPriceChange={onPriceChange} />

      <ColorFilter />
      <SizeFilter />
    </div>
  );
};

export default MenuShop;
