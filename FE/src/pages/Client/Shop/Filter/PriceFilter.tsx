// import React, { useState, useCallback } from "react";
// import usePriceFilter from "../../../../common/hooks/Products/Filter/usePriceFilter";
// import { SlArrowDown } from "react-icons/sl";
// import useClickOutside from "../../../../common/hooks/Products/Filter/useClickOutside";

// interface PriceFilterProps {
//   onPriceChange: (priceRanges: { min: number; max: number }[]) => void;
// }

// const PriceFilter: React.FC<PriceFilterProps> = ({ onPriceChange }) => {
//   const { selectedPriceRanges, handlePriceChange, resetPriceFilter } =
//     usePriceFilter();
//   const [isOpen, setIsOpen] = useState(false);

//   const ref = useClickOutside(() => setIsOpen(false));

//   const isPriceRangeSelected = useCallback(
//     (min: number, max: number) => {
//       return selectedPriceRanges.some(
//         (range) => range.min === min && range.max === max
//       );
//     },
//     [selectedPriceRanges]
//   );

//   const handlePriceClick = useCallback(
//     (min: number, max: number) => {
//       handlePriceChange(min, max);
//       const newPriceRanges = selectedPriceRanges.some(
//         (range) => range.min === min && range.max === max
//       )
//         ? selectedPriceRanges.filter(
//           (range) => !(range.min === min && range.max === max)
//         )
//         : [...selectedPriceRanges, { min, max }];

//       onPriceChange(newPriceRanges);
//     },
//     [handlePriceChange, onPriceChange, selectedPriceRanges]
//   );

//   const handleResetClick = useCallback(() => {
//     resetPriceFilter();
//     onPriceChange([]);
//   }, [resetPriceFilter, onPriceChange]);

//   const getSelectedPriceLabels = () => {
//     if (selectedPriceRanges.length === 0) {
//       return "Giá";
//     }
//     return selectedPriceRanges
//       .map((range) => {
//         if (range.max === Infinity) {
//           return `Trên $${Math.round(range.min / 1000)}K`;
//         }
//         return `$${Math.round(range.min / 1000)}K - $${Math.round(
//           range.max / 1000
//         )}K`;
//       })
//       .join(", ");
//   };

//   return (
//     <div className="relative inline-block text-left" ref={ref}>
//       <button
//         type="button"
//         className="flex items-center px-4 py-3"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <strong className="">
//           {getSelectedPriceLabels()}
//         </strong>
//         <SlArrowDown
//           size={10}
//           className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
//             }`}
//           style={{ flexShrink: 0 }} // Đảm bảo mũi tên không bị thu nhỏ
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
//           <ul className="overflow-y-auto max-h-60">
//             <li className="">
//               <button
//                 className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${isPriceRangeSelected(0, 150000) ? "bg-gray-100" : ""
//                   }`}
//                 onClick={() => handlePriceClick(0, 150000)}
//               >
//                 $0K - $150K
//               </button>
//             </li>
//             <li className="">
//               <button
//                 className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${isPriceRangeSelected(150001, 200000) ? "bg-gray-100" : ""
//                   }`}
//                 onClick={() => handlePriceClick(150001, 200000)}
//               >
//                 $150K - $200K
//               </button>
//             </li>
//             <li className="">
//               <button
//                 className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${isPriceRangeSelected(200001, 300000) ? "bg-gray-100" : ""
//                   }`}
//                 onClick={() => handlePriceClick(200001, 300000)}
//               >
//                 $200K - $300K
//               </button>
//             </li>
//             <li className="">
//               <button
//                 className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 ${isPriceRangeSelected(300001, Infinity) ? "bg-gray-100" : ""
//                   }`}
//                 onClick={() => handlePriceClick(300001, Infinity)}
//               >
//                 Trên $300K
//               </button>
//             </li>
//             <li className="flex justify-center w-full mt-4">
//               <button
//                 className="text-blue-500 underline"
//                 onClick={handleResetClick}
//               >
//                 Đặt lại
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PriceFilter;


import React from "react";


interface SortFilterProps {
  sortOption: string;
  onSortChange: (sortOption: string) => void;
}


const PriceFilter: React.FC<SortFilterProps> = ({
  sortOption,
  onSortChange,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };
  return (
    <div className="relative inline-block text-left">
      <select
        value={sortOption}
        onChange={handleSortChange}
        className={`flex items-center px-4 py-3 border-none outline-none  mt-[2px] ${
          sortOption ? "font-bold" : "font-bold"
        }`}
      >
        <option className="font-bold" value="">
          Giá
        </option>
        <option className="font-bold" value="price_attribute:asc">
          Giá: tăng dần
        </option>
        <option className="font-bold" value="price_attribute:desc">
          Giá: giảm dần
        </option>
      </select>
    </div>
  );
};


export default PriceFilter;


