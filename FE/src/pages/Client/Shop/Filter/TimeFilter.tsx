import React, { useState } from "react";
import { ICategory } from "../../../../common/interfaces/Category";
import { SlArrowDown } from "react-icons/sl";
import useClickOutside from "../../../../common/hooks/Products/Filter/useClickOutside";

interface TimeFilterProps {
  categories?: ICategory[];
  onCategorySelect: (ids: string[]) => void; // Kiểu dữ liệu phải là mảng ID
}

const TimeFilter: React.FC<TimeFilterProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  


  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        className="flex items-center justify-between w-52 p-2 text-gray-900 bg-[#EDEDED] rounded-md overflow-hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex-grow font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
         Thời Gian
        </span>
        <SlArrowDown
          className={`ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>

    
    </div>
  );
};

export default TimeFilter;
