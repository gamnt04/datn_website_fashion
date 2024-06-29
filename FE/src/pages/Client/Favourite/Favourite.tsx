import Products from "../../../components/common/Items/Products";
import img_product from '../../../assets/Images/Products/product_1.png';
import {
  HeartIcon,
} from "../../../resources/svg/Icon/Icon";
const Favourite = () => {
  const a : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25];
  return (
    <div className="lg:mt-[40px] mt-[60px]">
       <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
                Home &#10148; Products &#10148; Favorites
            </div>
      <div className="mt-8 grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[19%_19%_19%_19%_19%] xl:auto-rows-[450px] justify-between gap-y-8 ">
          {/* --  */}
          {a?.map((i) => 
          (<Products data={{img_product, i}}/>)
          )}
          {/* -- */}
        </div>
    </div>
    
  );
};
export default Favourite;
