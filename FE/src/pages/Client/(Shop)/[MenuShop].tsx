import { useState } from "react";

const MenuShop = () => {

    const [isDisplayOpen, setIsDisplayOpen] = useState(false);

    const toggleDisplay = () => {
      setIsDisplayOpen(!isDisplayOpen);
    };


  return (<div className="mt-[100px]">
  <div className="text-xl py-6 bg-[#F3F3F3] font-semibold px-[2.5%]">
    Products
  </div>

    {/* FILTER LEFT */}
    <div className="w-[95%] mx-[2.5%] flex flex-row items-center space-x-4 *:text-sm pt-10">
      <div>
        <h2>Filter:</h2>
      </div>
        <div
          className="flex flex-row items-center space-x-2"
          onClick={toggleDisplay}
        >
          <span className="opacity-80 hover:opacity-100 cursor-pointer">Availability</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {isDisplayOpen && (
          <div className="parent-display facets__display bg-white shadow-md rounded-b-md">
            <div className="facets__header flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <span className="facets__selected no-js-hidden">
                selected
              </span>
              <a
                href="/collections/all"
                className="facets__reset link underlined-link text-blue-500"
                role="button"
              >
                Reset
              </a>
            </div>
            <fieldset className="facets-wrap parent-wrap p-4">
              <ul
                className="facets__list list-unstyled no-js-hidden"
                role="list"
              >
                <li className="list-menu__item facets__item">
                  <label
                    htmlFor="Filter-filter.v.availability-1"
                    className="facet-checkbox flex items-center"
                  >
                    <input
                      type="checkbox"
                      name="filter.v.availability"
                      value="1"
                      id="Filter-filter.v.availability-1"
                      className="mr-2"
                    />
                  </label>
                </li>
                <li className="list-menu__item facets__item">
                  <label
                    htmlFor="Filter-filter.v.availability-2"
                    className="facet-checkbox flex items-center"
                  >
                    <input
                      type="checkbox"
                      name="filter.v.availability"
                      value="0"
                      id="Filter-filter.v.availability-2"
                      className="mr-2"
                    />
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>
        )}
      <div className="flex flex-row items-center space-x-2">
        <span className="opacity-80 hover:opacity-100 cursor-pointer">Brand</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <span className="opacity-80 hover:opacity-100 cursor-pointer">Product type</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <span className="opacity-80 hover:opacity-100 cursor-pointer">Color</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <span className="opacity-80 hover:opacity-100 cursor-pointer">Size</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
</div>)
}

export default MenuShop