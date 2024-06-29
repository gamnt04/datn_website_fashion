// import img_product from "../../../assets/Images/Products/product_1.png";
import Products from "../../../components/common/Items/Products";
import ListPage from "./[ListPage]";

const Products_Shop = () => {
  return (
    <div className="py-10">
      <div className="grid mb:grid-cols-[49%_49%] md:grid-cols-[32%_32%_32%] lg:grid-cols-[23%_23%_23%_23%] auto-rows-[400px] justify-between gap-y-6">
        <Products />
      </div>
      <ListPage />
    </div>
  );
};

export default Products_Shop;
