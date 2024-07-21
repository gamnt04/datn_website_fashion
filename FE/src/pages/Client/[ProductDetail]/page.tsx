import { useParams } from "react-router-dom";
import ImageProducts from "./ImageProducts";
import InforProduct from "./InforProduct";
import ProductRelated from "./RelatedProducts";
import DescriptionProduct from "./DescriptionProduct";
import { Query_Products } from "../../../common/hooks/Products/Products";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isPending, isError } = Query_Products(id);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details</div>;
  return (
    <div className="lg:mt-[40px] mt-[60px] lg:w-full w-[90vw] mx-auto">
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        Home &#10148; Products &#10148; Detail
      </div>
      <div className="lg:grid lg:grid-cols-[573px_auto] gap-x-20 lg:mt-5">
        {/*  desktop : left  , mobile : row 1 */}

        <ImageProducts product={data?.product} />
        {/*desktop: right, mobile : row 2 */}
        {/* <Infor_Detail_Product /> */}
        <div>
          <InforProduct dataProps={data} />
        </div>
      </div>
      {/* description */}
      <div>
        <DescriptionProduct product={data?.product} />
      </div>
      {/* related item */}
      <ProductRelated product={data?.product} />
    </div>
  );
};

export default ProductDetail;
