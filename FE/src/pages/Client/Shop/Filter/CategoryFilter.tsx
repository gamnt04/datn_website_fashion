import React from "react";
import { ICategory } from "../../../../common/interfaces/Category";

interface CategoryFilterProps {
  categories?: ICategory[];
  onCategorySelect: (id: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories = [],
  onCategorySelect,
}) => {
  const handleCategorySelect = (id: string | null) => {
    onCategorySelect(id);
  };

  const visibleCategories = categories.filter((category) => category.published);

  return (
    <div>
      <details open>
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-[#EDEDED]">
          <strong className="font-semibold">Product Categories</strong>
        </summary>
        <ul className="space-y-1 py-4 flex flex-col">
          <li>
            <button
              className="w-full text-left py-2 px-4 hover:bg-gray-100"
              onClick={() => handleCategorySelect(null)}
            >
              All
            </button>
          </li>
          {visibleCategories.length > 0 ? (
            visibleCategories.map((category) => (
              <li key={category._id}>
                <button
                  className="w-full text-left py-2 px-4 hover:bg-gray-100"
                  onClick={() => handleCategorySelect(category._id)}
                >
                  {category.name_category}
                </button>
              </li>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </ul>
      </details>
    </div>
  );
};

export default CategoryFilter;
