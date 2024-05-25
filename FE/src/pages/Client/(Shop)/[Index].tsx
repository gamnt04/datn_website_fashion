import MenuShop from "./[MenuShop]"
import Products_Shop from "./[Products]"

const IndexShops = () => {
    return (<>
        <MenuShop />
        <div className="w-[95%] mx-[2.5%]">
            <Products_Shop/>
        </div>
    </>)
}

export default IndexShops