import img_product from '../../../assets/Images/Products/product_1.png';
import Products from '../../../components/common/Items/Products';
import ListPage from "./[ListPage]";

const Products_Shop = () => {

    const a : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

  return (<div className="py-10">
         <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%] xl:auto-rows-[450px] justify-between gap-y-8">
            {
                a?.map((i : number) => (
                    <Products data={{img_product, i}}/>
                ))
            }
         </div>
         <ListPage/>
  </div>)
}

export default Products_Shop