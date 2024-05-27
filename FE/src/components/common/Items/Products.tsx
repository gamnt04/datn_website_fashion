
interface dataProps {
    data? :string;
}

const Products  = ({data } : dataProps) => {


  return (
    <div className="w-full text-center">
          <div className="w-full h-[400px] *:w-full *:h-full bg-[#F6F6F6] *:lg:px-20 *:mb:px-10 *:lg:py-16 *:mb:py-6 *:drop-shadow">
            <img src={data}/>
          </div>

            <h3 className="text-[16px] font-normal text-[#222222] mt-5">
              Dome Lamp
            </h3>
            <p className="text-[10px] font-normal text-[#999999] mt-2">
              Butterfly
            </p>
            <p className="text-[16px] font-medium text-[#222222] mt-2">
              2.000.000 VND
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <img
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={data}
                alt=""
              />
              <img
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={data}
                alt=""
              />
              <img
                className="w-[40px] h-[40px] p-2 rounded-full border duration-300 hover:border-[#F68E56]"
                src={data}
                alt=""
              />
            </div>
          </div>
  )
}

export default Products