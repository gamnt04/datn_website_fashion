import Banner from "./Banner";
import Trending_Products from "./Trending";
import Fres from "./Fres";
import Ourblog from "./Ourblog";
import List_Products from "./List_Products";


const IndexHome = () => {
    return (<div className="lg:mt-[40px] mt-[60px]">
        <Banner />
        <div className="w-full">
        <Trending_Products />
        </div>
        <Fres />
        <div className="w-full">
            <List_Products/>
            <Ourblog />
        </div>


    </div>)
}

export default IndexHome
