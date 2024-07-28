const PriceFilter = () => {
  return (
    <div className="border-b py-2">
      <details
        className="group [&_summary::-webkit-details-marker]:hidden *:px-4"
        open
      >
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-[#EDEDED]">
          <strong>Price</strong>
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
        <div className="flex flex-col py-4">
          <span className="mb-4">Price : 0$ - 10000$</span>
          <input className="h-1" type="range" />
        </div>
      </details>
    </div>
  );
};

export default PriceFilter;
