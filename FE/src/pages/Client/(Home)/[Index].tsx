import Banner from "./[Banner]";
import Trending_Products from "./[Trending]";
import Fres from "./[Fres]";
import Outstanding from "./[Outstanding]";
import Ourblog from "./[Ourblog]";
import Brand from "./[Brand]";
import Get_in_touch from "./[Get_in_touch]";


const IndexHome = () => {
    return (<div className="mt-[100px]">

        <Banner />
        <div className="w-full">
            <Outstanding />
        </div>
        <Fres />
        <div className="w-full">
            <Trending_Products />
            <Ourblog />
            <Brand />
            <Get_in_touch/>
        </div>


    </div>)
}

export default IndexHome