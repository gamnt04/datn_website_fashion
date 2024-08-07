import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import useClickOutside from "../../../../common/hooks/Products/Filter/useClickOutside"; // Đảm bảo đường dẫn đúng

interface SizeFilterProps {
  sizeOptions: string[];
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  resetSizeFilter: () => void;
  onSizeChange: (sizes: string[]) => void;
}

const SizeFilter: React.FC<SizeFilterProps> = ({
  sizeOptions,
  selectedSizes,
  toggleSize,
  resetSizeFilter,
  onSizeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Sử dụng hook để theo dõi click ngoài
  const ref = useClickOutside(() => setIsOpen(false));

  const handleSizeChange = (size: string) => {
    toggleSize(size);
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    onSizeChange(updatedSizes);
  };

  // Hàm để lấy tiêu đề của kích thước đã chọn
  const getSelectedSizeLabel = () => {
    if (selectedSizes.length === 0) {
      return "size";
    }
    if (selectedSizes.length === 1) {
      return `size: ${selectedSizes[0]}`;
    }
    return `size: ${selectedSizes.join(", ")}`;
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        className="flex items-center justify-between w-40 p-2 text-gray-900 bg-[#EDEDED] rounded-md overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap flex-grow">
          {getSelectedSizeLabel()}
        </strong>
        <SlArrowDown
          className={`ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 p-3 mt-2 w-[900px] bg-white border border-gray-200 rounded-md shadow-lg overflow-auto max-h-60">
          <ul className="flex flex-wrap gap-2">
            {sizeOptions.length > 0 ? (
              sizeOptions.map((size) => (
                <li
                  key={size}
                  className="flex-shrink-0 w-1/5 max-w-[calc(20%-0.8rem)]"
                >
                  <button
                    className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${
                      selectedSizes.includes(size) ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    size {size}
                  </button>
                </li>
              ))
            ) : (
              <p className="px-4 py-2">Không có size</p>
            )}
            <li className="w-full mt-4">
              <button
                className="text-blue-500 underline"
                onClick={() => {
                  resetSizeFilter();
                  onSizeChange([]); // Reset the filter
                }}
              >
                Đặt lại bộ lọc kích thước
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
