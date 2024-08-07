import { Link } from "react-router-dom";

const Fres = () => {
  return (
    <>
      <div className="relative flex justify-between h-[350px] *:w-[47.5%] bg-black rounded">
        {/* btn */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-center items-center *:text-white">
          <strong className="text-[52px] font-semibold">Fres 2 days</strong>
          <span className=" text-[18px]">
            shipping on eligible items with $30 + orders
          </span>
          <Link
            to={""}
            className="border-2 mt-5 border-white uppercase px-[30px] py-2 hover:scale-[1.05] cursor-pointer duration-300 "
          >
            {" "}
            discover now{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Fres;
