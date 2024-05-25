import { Link } from 'react-router-dom';
import img_product from '../../../assets/Images/Products/product_1.png';
import Products from '../../../Components/Items/Products';

const Trending_Products = () => {
  const a : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="py-16 text-center border-b">
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
        <div className="mb-[50px]">
          
        <div className="overflow-x-scroll hidden_scroll_x grid mt-10 grid-flow-col gap-x-[2.66%] mb:auto-cols-[48%] md:auto-cols-[33%] lg:auto-cols-[23%] gap-y-[50px] justify-between">

          {/* --  */}
          {a?.map(() => 
          (<Products data={img_product}/>)
          )}

          {/* -- */}

        </div>
        {/* back, next page */}
        <div className='flex items-center *:mx-8 justify-center mt-[20px] *:duration-300 *:text-lg'>
          <button className='opacity-50 cursor-no-drop'>&#10094;</button>
          <button className='hover:scale-[1.3]'>&#10095;</button>
        </div>
        </div>

        {/* view all */}
        <Link className='border px-10 py-2 bg-black text-white' to={''}>View All</Link>
    </div>
  )
}

export default Trending_Products