import React, { useState, useEffect } from "react";
import { ICategory } from "../../../../common/interfaces/Category";
import { useSearchParams } from "react-router-dom";

interface CategoryFilterProps {
  categories?: ICategory[];
  onCategorySelect: (ids: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories = [],
  onCategorySelect,
}) => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("cate_id");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  // Chỉ đồng bộ một lần khi component mount hoặc categoryFromUrl thay đổi
  useEffect(() => {
    if (categoryFromUrl && !selectedCategories.includes(categoryFromUrl)) {
      setSelectedCategories([categoryFromUrl]);
      onCategorySelect([categoryFromUrl]);
    }
  }, [categoryFromUrl]); // Bỏ onCategorySelect khỏi dependencies

  const handleCategoryToggle = (id: string) => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];

    setSelectedCategories(updatedCategories);
    onCategorySelect(updatedCategories);
  };

  // Lọc danh mục đã được công bố và không có tên là "Uncategorized"
  const visibleCategories = categories.filter(
    (category) =>
      category.published && category.name_category !== "Uncategorized"
  );

  return (
    <div className="relative border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-900 rounded-md"
      >
        <strong className="font-semibold mb:text-sm lg:text-lg">
          Danh Mục
        </strong>
        <span
          className={`shrink-0 transition duration-300 ${
            isOpen ? "-rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="w-full bg-white rounded-md">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {visibleCategories.length > 0 ? (
              visibleCategories.map((category) => (
                <div key={category._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryToggle(category._id)}
                    className="mr-2"
                  />
                  <label htmlFor={category._id} className="text-gray-700">
                    {category.name_category}
                  </label>
                </div>
              ))
            ) : (
              <p className="col-span-2 px-4 py-2">No categories available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
