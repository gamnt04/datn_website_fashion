import { Link } from "react-router-dom"

const Fres = () => {
  return (<>
  <div className="relative flex justify-between h-[350px] *:w-[47.5%] bg-black">
      {/* btn */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-center items-center *:text-white">
        <strong className="text-[46px] font-semibold">Fres 2 days</strong>
        <span className="my-5">shipping on eligible items with $30 + orders</span>
        <Link to={''} className="border-2 border-white uppercase px-8 py-2"> discover now </Link>
      </div>
    </div>
  </> )
}

export default Fres