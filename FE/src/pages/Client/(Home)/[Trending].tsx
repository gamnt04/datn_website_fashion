import { Link } from 'react-router-dom';
import Products from '../../../components/common/Items/Products';
import { useRef } from 'react';
import ScrollTop from '../../../common/hooks/Customers/ScrollTop';
import { Query_Products } from '../../../common/hooks/Products/Products';

const Trending_Products = () => {
  const {data, isPending} = Query_Products();
  const sizeListItems = useRef<HTMLDivElement | null>(null);
  const backItems = useRef<HTMLButtonElement | null>(null);
  const nextItems = useRef<HTMLButtonElement | null>(null);
  
  const handleNext = () => {
    if (sizeListItems.current) {
      const offsetWidthListItems = sizeListItems.current.offsetWidth || 0;
      const sizeGapColumn = parseFloat(window.getComputedStyle(sizeListItems.current).getPropertyValue('column-gap').replace('%', ''));
      sizeListItems.current.scrollLeft = (sizeListItems.current.scrollLeft + offsetWidthListItems) + (sizeGapColumn / 100 * (offsetWidthListItems));
    }
  };
  

 const handlePrevious = () => {
  if (sizeListItems.current) {
    const offsetWidthListItems = sizeListItems.current.offsetWidth || 0;
    const sizeGapColumn = parseFloat(window.getComputedStyle(sizeListItems.current).getPropertyValue('column-gap').replace('%', ''));
    sizeListItems.current.scrollLeft = (sizeListItems.current.scrollLeft  - offsetWidthListItems) - (sizeGapColumn / 100 * (offsetWidthListItems));
  }
  }
  

  return (
    <div className="py-16 text-center border-b overflow-hidden">
        {/* title */}
        <div className="text-center flex flex-col items-center">
          <span className="text-4xl font-medium tracking-wide">Trending Products</span>
          <p className="opacity-80 text-sm my-10">Find a bright ideal to suit your taste width our great selection of suspension.</p>
          <nav className="flex *:relative *:mx-6 justify-between *:after:content-[''] *:after:absolute *:after:h-[2px] *:after:bg-orange-500 *:after:bottom-[-20%] *:after:duration-500 *:font-medium *:after:rounded-lg">
            <button className="opacity-100 after:w-full after:left-0">Living</button>
            <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">Furniture</button>
            <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">Accessories</button>
            <button className="opacity-75 hover:opacity-100 after:left-1/2 after:w-0 hover:after:w-full hover:after:left-0">Tech</button>
          </nav>
        </div>


        {/* products */}
        <div className="mb-[50px] w-auto">
        <div ref={sizeListItems} className="overflow-x-scroll hidden_scroll-x_trendingproducts scroll-smooth listProductsTrendingChild grid mt-10 grid-flow-col lg:gap-x-[1.25%] gap-x-[2.66%] mb:auto-cols-[48%] xl:auto-rows-[450px] md:auto-cols-[33%] lg:auto-cols-[19%]">
          {isPending && <span>Loading ...</span>}
          {
            data?.map((item : any) => {
              return (<Products key={item._id} items={item}/>)
            })
          }
        </div>
        {/* back, next page */}
        <div className='flex items-center *:mx-8 justify-center mt-[20px] *:duration-300 *:text-lg'>
          <button ref={backItems} onClick={handlePrevious} className='opacity-50 cursor-drop'>&#10094;</button>
          <button ref={nextItems} onClick={handleNext} className='hover:scale-[1.3]'>&#10095;</button>
        </div>
        </div>

        {/* view all */}
        <div className='hover:scale-105 duration-300'>
        <Link onClick={ScrollTop} className='border px-10 py-2 bg-black rounded-md border-none cursor-pointer text-white' to={'/shops'}>View All</Link>
        </div>
    </div>
  )
}

export default Trending_Products