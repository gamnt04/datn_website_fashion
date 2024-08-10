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
        className="flex items-center py-3 px-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-bold">
          Thời Gian
        </span>
        <SlArrowDown
          size={10}
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
        />
      </button>


    </div>
  );
};

export default TimeFilter;
