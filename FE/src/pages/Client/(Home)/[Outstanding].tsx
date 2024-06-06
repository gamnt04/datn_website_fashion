import { Link } from "react-router-dom"

const Outstanding = () => {
  return (
    <div className="grid mb:grid-cols-1 mb:gap-y-[20px] lg:grid-cols-[47.5%_47.5%] justify-between *:mb:h-auto *:lg:h-[400px] *:w-full py-16">
        {/* left */}
        <div className="grid grid-cols-2 *:w-full cursor-pointer *:h-full px-12 bg-[#FFEEE6] group *:duration-500 overflow-hidden">
            <div className="py-14 *:w-full *:h-full">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <strong className="uppercase text-sm opacity-75">save up 50%</strong>
                        <span className="text-4xl font-semibold leading-10 mt-4">Clock <br /> Sofiataria</span>
                    </div>
                    <Link to={''} className="uppercase font-semibold">discover now </Link>
                </div>
            </div>
            <div className="w-full *:h-full pb-12 overflow-hidden group-hover:scale-[1.1]">
                <img src="../../src/assets/Images/Products/img_outstanding.png" alt="" />
            </div>
        </div>


        {/* right */}
        <div className="grid grid-cols-2 *:w-full *:h-full px-12 bg-[#F2F2F2] group *:duration-500 overflow-hidden">
        <div className="py-14 *:w-full *:h-full">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <strong className="uppercase text-sm opacity-75">save up 50%</strong>
                        <span className="text-4xl font-semibold leading-10 mt-4">Clock <br /> Sofiataria</span>
                    </div>
                    <Link to={''} className="uppercase font-semibold">discover now </Link>
                </div>
            </div>
            <div className="w-full *:h-full pb-12 overflow-hidden group-hover:scale-[1.1]">
                <img src="../../src/assets/Images/Products/img_outstanding.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Outstanding