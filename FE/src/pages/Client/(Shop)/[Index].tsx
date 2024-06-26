import MenuShop from "./[MenuShop]"
import Products_Shop from "./[Products]"

const IndexShops = () => {
    return (
        <div className="mt-[100px]">
            <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%]">
                Home &#10148; Products &#10148; All
            </div>
            <div className="xl:grid grid-cols-[19%_77%] justify-between">
                <MenuShop />
                <div className="mb:w-[95%] xl:w-full mb:mx-[2.5%] xl:mx-0">
                    <Products_Shop />
                </div>
            </div>

        </div>
    )
}

export default IndexShops