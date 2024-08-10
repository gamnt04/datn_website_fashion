import React, { useState } from "react";
import { ICategory } from "../../../../common/interfaces/Category";
import { SlArrowDown } from "react-icons/sl";
import useClickOutside from "../../../../common/hooks/Products/Filter/useClickOutside";

interface CategoryFilterProps {
  categories?: ICategory[];
  onCategorySelect: (ids: string[]) => void; // Kiểu dữ liệu phải là mảng ID
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories = [],
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const ref = useClickOutside(() => setIsOpen(false));

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(id)
        ? prev.filter((catId) => catId !== id)
        : [...prev, id];

      onCategorySelect(updatedCategories); // Gửi mảng ID
      return updatedCategories;
    });
  };

  const visibleCategories = categories.filter((category) => category.published);

  const selectedCategoryNames = categories
    .filter((category) => selectedCategories.includes(category._id))
    .map((category) => category.name_category);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        className="flex items-center py-3 px-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-bold">
          {selectedCategoryNames.length > 0
            ? selectedCategoryNames.join(", ")
            : "Danh mục"}
        </span>
        <SlArrowDown
          size={10}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          <ul className="">
            {visibleCategories.length > 0 ? (
              visibleCategories.map((category) => (
                <li
                  key={category._id}
                  className=""
                >
                  <button
                    className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${selectedCategories.includes(category._id)
                      ? "bg-gray-100"
                      : ""
                      }`}
                    onClick={() => handleCategoryToggle(category._id)}
                  >
                    {category.name_category}
                  </button>
                </li>
              ))
            ) : (
              <p className="px-4 py-2">No categories available</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
