
import ImageProducts from "./ImageProducts";
import InforProduct from "./InforProduct";
import ProductRelated from "./RelatedProducts";
import DescriptionProduct from "./[DescriptionProduct]";

const ProductDetail = () => {
  return (
    <div className="lg:mt-[40px] mt-[60px] lg:w-full w-[90vw] mx-auto">
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        Home &#10148; Products &#10148; Detail
      </div>
      <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-20 lg:mt-5">
        {/*  desktop : left  , mobile : row 1 */}

        <ImageProducts />
        {/*desktop: right, mobile : row 2 */}
        {/* <Infor_Detail_Product /> */}
        <div>
          <InforProduct />
        </div>
      </div>
      {/* description */}
      <div>
        <DescriptionProduct />
      </div>
      {/* related item */}
      <ProductRelated />
    </div>
  );
};

export default ProductDetail;
