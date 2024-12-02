import React from "react";

interface ArrangeFilterProps {
  onSortChange: (value: string) => void;
  sortOption: string;
}

const sortOptions = [
  { value: "", label: "Mặc Định" },
  { value: "createdAt:desc", label: "Mới Nhất" },
  { value: "createdAt:asc", label: "Cũ Nhất" },
  { value: "price_attribute:asc", label: "Giá thấp" }, // Sắp xếp theo giá thấp
  { value: "price_attribute:desc", label: "Giá cao" }, // Sắp xếp theo giá cao
];

const ArrangeFilter: React.FC<ArrangeFilterProps> = ({
  onSortChange,
  sortOption,
}) => {
  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  return (
    <div className="border mt-10 p-2 bg-[#F9F9F9]">
      <div className="flex items-center px-4 text-gray-900">
        <strong className="mr-6 text-lg font-semibold">Sắp Xếp :</strong>
        <ul className="flex space-x-4">
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  sortOption === option.value
                    ? "bg-gray-200 text-gray-900 font-semibold border border-gray-300"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArrangeFilter;
