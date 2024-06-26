import { NavLink } from "react-router-dom"

const MenuShop = () => {


  return (
    <div className="hidden lg:block w-full h-auto flex flex-col my-10">
  {/* categories */}
        <details className="group [&_summary::-webkit-details-marker]:hidden" open>
          <summary className="flex cursor-pointer items-center justify-between rounded-md py-2 text-gray-900">
            <strong className="mb:text-sm lg:text-lg font-semibold">Product Categories</strong>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <ul className="space-y-1 py-4 *:w-full *:px-6 *:py-2 *:rounded *:my-2 mb:text-sm lg:text-md font-medium flex flex-col">
              <NavLink to={'/shops'} className={({isActive}) => isActive ? 'bg-gray-100 duration-300 opacity-100 font-semibold' :  'bg-none hover:bg-gray-100 duration-300 opacity-75 hover:opacity-100 hover:font-semibold'}>All</NavLink>
              <NavLink to={'/shops/ao'} className={({isActive}) => isActive ? 'bg-gray-100 duration-300 opacity-100 font-semibold' :  'bg-none hover:bg-gray-100 duration-300 opacity-75 hover:opacity-100 hover:font-semibold'}>Ao</NavLink>
              <NavLink to={'/shops/quan'} className={({isActive}) => isActive ? 'bg-gray-100 duration-300 opacity-100 font-semibold' :  'bg-none hover:bg-gray-100 duration-300 opacity-75 hover:opacity-100 hover:font-semibold'}>Quan</NavLink>
              <NavLink to={'/shops/mu'} className={({isActive}) => isActive ? 'bg-gray-100 duration-300 opacity-100 font-semibold' :  'bg-none hover:bg-gray-100 duration-300 opacity-75 hover:opacity-100 hover:font-semibold'}>Mu</NavLink>
          </ul>
        </details>
  {/* filter price */}
  <div className="border-b py-2">
    <ul className="space-y-1">
      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden" open>
          <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 hover:bg-gray-100">
            <strong>Price</strong>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <div className="flex flex-col py-4">
            <span className="mb-4">Price : 0$ - 10000$</span>
            <input type="range" />
          </div>
        </details>
      </li>
    </ul>
  </div>
  
  {/*filter color */}
  <div className="border-b py-2">
    <ul className="space-y-1">
      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 hover:bg-gray-100">
            <strong>Color</strong>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <ul className="space-y-1 py-4">
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Red</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Red</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Red</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Red</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Red</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Red</span>
              </div>
              <span>(10)</span>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>

  {/* filter by size */}
  <div className="py-2">
    <ul className="space-y-1">
      <li>
        <details className="group [&_summary::-webkit-details-marker]:block">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg py-2 hover:bg-gray-100">
            <strong>Size</strong>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </summary>
          <ul className="space-y-1 py-4">
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Size</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Size</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Size</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Size</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Size</span>
              </div>
              <span>(10)</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <div className="flex items-center *:w-[25px] *:h-[25px]">
                <span className="px-3">Size</span>
              </div>
              <span>(10)</span>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>

  )
}

export default MenuShop