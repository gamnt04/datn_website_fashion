const SizeFilter = () => {
  return (
    <div className="py-2">
      <details className="group [&_summary::-webkit-details-marker]:block *:px-4">
        <summary className="flex cursor-pointer items-center justify-between py-2 text-gray-900 bg-gray-100">
          <strong>Size</strong>
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
        <ul className="space-y-1 py-4">
          {/* Replace with your size options */}
          <li className="py-2 flex justify-between items-center">
            <div className="flex items-center *:w-[25px] *:h-[25px]">
              <span className="px-3">Size</span>
            </div>
            <span>(10)</span>
          </li>
          {/* Add more sizes as needed */}
        </ul>
      </details>
    </div>
  );
};

export default SizeFilter;
