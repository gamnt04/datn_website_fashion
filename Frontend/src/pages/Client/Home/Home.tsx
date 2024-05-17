import home from "../../../resources/images/imgHome/homeBlog1.jpg";
const Home = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-5 mb-5">
      <div className="flex gap-2 text-[#222222]">
        <div className="border-[1px] border-[#999999] h-[456px] relative overflow-hidden flex flex-col items-center rounded">
          <a
            href="#"
            className="block overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              className="h-[378px] w-full object-cover transform-gpu"
              src={home}
              alt="Logo"
            />
          </a>
          <a className="mt-5 text-lg font-semibold text-center" href="">
            Accessories
          </a>
        </div>
        <div className="border-[1px] border-[#999999] h-[456px] relative overflow-hidden flex flex-col items-center rounded">
          <a
            href="#"
            className="block overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              className="h-[378px] w-full object-cover transform-gpu"
              src={home}
              alt="Logo"
            />
          </a>
          <a className="mt-5 text-lg font-semibold text-center" href="">
            Dining
          </a>
        </div>
        <div className="border-[1px] border-[#999999] h-[456px] relative overflow-hidden flex flex-col items-center rounded">
          <a
            href="#"
            className="block overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              className="h-[378px] w-full object-cover transform-gpu"
              src={home}
              alt="Logo"
            />
          </a>
          <a className="mt-5 text-lg font-semibold text-center" href="">
            Living
          </a>
        </div>
      </div>
      <div className="flex justify-center mt-5 ">
        <button className="bg-[#222222] text-white w-[114px] h-[44px] hover:bg-[#f68e56] underline font-normal">
          View all
        </button>
      </div>
    </div>
  );
};
export default Home;
