// src/components/Filter/CategoryFilter.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";

interface CategoryFilterProps {
  onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onCategoryChange,
}) => {
  const { data } = useCategoryQuery();

  const handleCategoryChange = (categoryId: string | null) => {
    onCategoryChange(categoryId);
  };

  return (
    <details
      className="group [&_summary::-webkit-details-marker]:hidden *:px-4 "
      open
    >
      <summary className=" flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-gray-100">
        <strong className="mb:text-sm lg:text-lg font-semibold">
          Danh mục sản phẩm
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
        <NavLink
          to="#"
          onClick={() => handleCategoryChange(null)} // Clear category filter
          className="block p-2 hover:bg-gray-100"
        >
          All Categories
        </NavLink>
        {data?.map((category: ICategory) => (
          <NavLink
            key={category._id}
            to="#"
            onClick={() => handleCategoryChange(category._id)}
            className="block p-2 hover:bg-gray-100"
          >
            {category.name_category}
          </NavLink>
        ))}
      </ul>
    </details>
  );
};

export default CategoryFilter;
