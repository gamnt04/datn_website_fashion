import React from "react";
import { ICategory } from "../../../../common/interfaces/Category";

const CategoryFilter: React.FC<{
  categories?: ICategory[];
  onCategorySelect: (id: string | null) => void;
}> = ({ categories = [], onCategorySelect }) => {
  const handleCategorySelect = (id: string | null) => {
    onCategorySelect(id);
  };

  // Lọc các danh mục công khai
  const visibleCategories = categories.filter(category => category.published);

  return (
    <div>
      <details
        className="group [&_summary::-webkit-details-marker]:hidden *:px-4"
        open
      >
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-[#EDEDED]">
          <strong className="mb:text-sm lg:text-lg font-semibold">
            Product Categories
          </strong>
          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <ul className="space-y-1 py-4 *:w-full *:px-6 *:py-2 *:rounded *:my-2 mb:text-sm lg:text-md font-medium flex flex-col">
          <li>
            <button
              className="w-full text-left py-2 px-4 bg-none hover:bg-gray-100 duration-300 opacity-75 hover:opacity-100 hover:font-semibold"
              onClick={() => handleCategorySelect(null)}
            >
              All
            </button>
          </li>
          {visibleCategories.length > 0 ? (
            visibleCategories.map((category) => (
              <li key={category._id}>
                <button
                  className="w-full text-left py-2 px-4 bg-none hover:bg-gray-100 duration-300 opacity-75 hover:opacity-100 hover:font-semibold"
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
