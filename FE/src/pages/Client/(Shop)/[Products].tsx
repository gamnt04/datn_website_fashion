// import img_product from "../../../assets/Images/Products/product_1.png";
import { useState } from "react";
import { Query_Products } from "../../../common/hooks/Products/Products";
import Products from "../../../components/common/Items/Products";
const Products_Shop = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending } = Query_Products('',page);
  function dow () {
    (page > 1) && setPage(page -1)
  }
  function up () {
    alert('1222')
     setPage(page + 1)
  }
  return (
    <div className="py-10">
      <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%] auto-rows-[400px] justify-between gap-y-6">
        {isPending && <span>Loading ...</span>}
        {
          data?.map((item: any) => {
            return (<Products key={item._id} items={item} />)
          })
        }
      </div>
      <div className="flex justify-center mt-16">
        <div className="flex items-center *:mx-3 *:border *:border-gray-600 *:w-[40px]
   *:h-[40px] *:grid *:place-items-center *:duration-300 *:cursor-pointer">
          <button onClick={dow} className="opacity-50 hover:opacity-100">&#10094;</button>
          <button onClick={up} className="opacity-50 hover:opacity-100">&#10095;</button>
        </div>
      </div>
    </div>
  );
};

export default Products_Shop;
