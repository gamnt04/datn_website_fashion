
import React, { useState } from "react";
import useCategories from "../../../common/hooks/Category/useCategoryQuery";
// import Get_in_touch from "../(Home)/Get_in_touch";

import MenuShop from "./MenuShop";
import Products_Shop from "./Products";

const IndexShops = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const { data: categories } = useCategories();

  const handleCategorySelect = (id: string | null) => {
    setSelectedCategoryId(id);
  };

  return (
    <div className="xl:w-[1440px] w-[95vw] mx-auto">
      <div className="lg:mt-[40px] mt-[60px]">
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          Home &#10148; Products &#10148; All
        </div>
        <div className="xl:grid grid-cols-[21%_76%] justify-between">
          <MenuShop
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
          <div className="mb:w-[95%] xl:w-full mb:mx-[2.5%] xl:mx-0">
            <Products_Shop selectedCategoryId={selectedCategoryId} />
          </div>
        </div>
        {/* <Get_in_touch /> */}
      </div>
    </div>

  );
};

export default IndexShops;