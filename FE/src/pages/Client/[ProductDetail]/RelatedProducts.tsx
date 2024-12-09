import Products from "../../../components/common/Items/Products";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { IProduct } from "../../../common/interfaces/Product";

const ProductRelated = ({ product }: { product: IProduct }) => {
  const data = Query_Products();
  const san_pham_cung_loai = data?.data?.filter(
    (item: IProduct) => item?.category_id === product?.category_id
  );

  return (
    <div className="w-full mt-[10px]">
      <hr />
      <div className="py-16">
        <h2 className="text-xl font-semibold">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 gap-6 mt-4 lg:grid-cols-4">
          {san_pham_cung_loai?.map((item: IProduct) => (
            <Products key={item._id} items={item} />
          ))}
        </div>
      </div>
      {/* END RECOMMEND */}
    </div>
  );
};

export default ProductRelated;
