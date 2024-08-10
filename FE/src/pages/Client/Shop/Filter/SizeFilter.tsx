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
        className="flex items-center py-3 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <strong className="">
          {getSelectedSizeLabel()}
        </strong>
        <SlArrowDown
          size={10}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10  w-[500px] bg-white border border-gray-200 rounded overflow-auto">
          <ul className="grid grid-cols-4 gap-1 max-h-60 overflow-y-auto">
            {sizeOptions.length > 0 ? (
              sizeOptions.map((size) => (
                <li
                  key={size}
                  className=""
                >
                  <button
                    className={`w-full text-left p-2 rounded hover:bg-gray-100 ${selectedSizes.includes(size) ? "bg-gray-100" : ""
                      }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    <span className="flex justify-between">size: {size}</span>
                  </button>
                </li>
              ))
            ) : (
              <p className="px-4 py-2">Không có size</p>
            )}

          </ul>
          <div className="w-full mt-4 flex justify-center p-1">
            <button
              className="text-blue-500 underline "
              onClick={() => {
                resetSizeFilter();
                onSizeChange([]); // Reset the filter
              }}
            >
              Đặt lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
