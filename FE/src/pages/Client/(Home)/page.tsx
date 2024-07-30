import Banner from "./Banner";
import Trending_Products from "./Trending";
import Fres from "./Fres";
// import Outstanding from "./Outstanding";
import Ourblog from "./Ourblog";
import AllProducts from "./AllProducts";
// import Brand from "./Brand";
// import Get_in_touch from "./Get_in_touch";

const IndexHome = () => {
  return (
    <div className="lg:mt-[40px] mt-[60px]">
      <Banner />
      {/* <div className="w-full">
        <Outstanding />
      </div> */}
      <Trending_Products />
      <Fres />
      <div className="w-full">
        <AllProducts />
        <Ourblog />
        {/* <Brand />
            <Get_in_touch/> */}
      </div>
    </div>
  );
};

export default IndexHome;
