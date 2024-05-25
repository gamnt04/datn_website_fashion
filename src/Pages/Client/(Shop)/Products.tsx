import Products from "../../../Components/Items/Products";
import img_product from '../../../assets/Images/Products/product_1.png';
import ListPage from "./ListPage";

const Products_Shop = () => {

    const a : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

  return (<div className="py-10">
         <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[24%_24%_24%_24%] justify-between gap-y-[20px]">
            {
                a?.map(() => (
                    <Products data={img_product}/>
                ))
            }
         </div>
         <ListPage/>
  </div>)
}

export default Products_Shop