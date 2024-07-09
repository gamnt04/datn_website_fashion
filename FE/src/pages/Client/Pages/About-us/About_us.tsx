import {
  SearchIcon,
  CartIcon,
  HeartIcon,
  NoteIcon,
  ArrowRight,
} from "../../../../resources/svg/Icon/Icon";
const AboutUS = () => {
  const arr = [1, 2, 3];
  return (
    <div className="container lg:mt-[40px] mt-[60px]">
      <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
        Home &#10148; Pages &#10148; About-Us
      </div>
      <div className="mb-20">
        <div className="text-center mb-16">
          <div className="mb-20 mt-9 ">
            <p className="font-bold text-xl mb-5 uppercase tracking-wider ">
              Meet our team
            </p>
            <nav className="lg:w-[700px] w-[90%] mx-auto lg:text-base text-sm text-center text-gray-500 ">
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam littera gothica.
              Lorem Khaled Ipsum is a major key to success. They don’t want us
              to win. Always remember in the jungle there’s a lot of they in
              there, after you overcome they, you will make it to paradise.
              Major key, don’t fall for the trap, stay focused. It’s the ones
              closest to you that want to see you fail. Major key, don’t fall
              for the trap, stay focused. It’s the ones closest to you that want
              to see you fail. You see the hedges, how I got it shaped up? It’s
              important to shape up your hedges, it’s like getting a haircut,
              stay fresh.
            </nav>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cold-2 grid-cols-1 gap-8 *:bg-gray-100 *:cursor-pointer *:duration-300 *:rounded">
            {
              arr?.map(() => (
                <div className="border p-4 hover:scale-105">
                  <img
                    src="../../../src/resources/images/logo/images.jpg"
                    alt=""
                    className="w-full h-48"
                  />
                  <div className="text-left mt-5">
                    <p className="font-bold text-gray-500">Patrict</p>
                    <p className="text-sm">CEO & Founder of Stark Store.</p>
                    <nav className="text-sm">
                      Claritas est etiam processus dynamicus, qui sequitur
                      mutationem consuetudium lectorum. Mirum est notare quam
                      littera.
                    </nav>
                  </div>
                </div>
              ))
            }

            {/* <div className="border p-4">
              <img
                src="../../../src/resources/images/logo/images.jpg"
                alt=""
                className="w-full h-48"
              />
              <div className="text-left mt-5">
                <p className="font-bold text-gray-500">Patrict</p>
                <p className="text-sm">CEO & Founder of Stark Store.</p>
                <nav className="text-sm">
                  Claritas est etiam processus dynamicus, qui sequitur
                  mutationem consuetudium lectorum. Mirum est notare quam
                  littera.
                </nav>
              </div>
            </div>
            <div className="border p-4">
              <img
                src="../../../src/resources/images/logo/images.jpg"
                alt=""
                className="w-full h-48"
              />
              <div className="text-left mt-5">
                <p className="font-bold text-gray-500">Patrict</p>
                <p className="text-sm">CEO & Founder of Stark Store.</p>
                <nav className="text-sm">
                  Claritas est etiam processus dynamicus, qui sequitur
                  mutationem consuetudium lectorum. Mirum est notare quam
                  littera.
                </nav>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <iframe
          className="lg:w-[1200px] w-full"
            src="https://www.youtube.com/embed/_9VUPq3SxOc"
          ></iframe>
        </div>
        <div className="my-10 text-center">
          <h2 className="font-bold text-xl mb-5 uppercase tracking-wider ">Our Collector</h2>
          <div className="grid lg:grid-cols-3 md:grid-cold-2 grid-cols-1 gap-8 text-center *:duration-300 *:cursor-pointer *:overflow-hidden *:rounded *:lg:shadow-lg *:shadow">
            {
              arr?.map(() => (
                <div className="text-center image-container hover:scale-105">
                  <img
                    src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                    alt=""
                    className="w-full h-96"
                  />
                  <p className="text-lg mt-5 p-3 flex justify-center items-center">
                    Áo ahihi
                    <div className="w-5 h-5 ml-2">
                      <ArrowRight />
                    </div>
                  </p>
                </div>
              ))
            }

            {/* <div className="border border-gray-300">
              <div className="text-center image-container">
                <img
                  src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                  alt=""
                  className="w-full h-96"
                />
                <p className="text-lg font-thin mt-5 p-3 flex justify-center items-center">
                  Dép Màu Đen
                  <div className="w-5 h-5 ml-2">
                    <ArrowRight />
                  </div>
                </p>
              </div>
            </div>
            <div className="border border-gray-300">
              <div className="text-center image-container">
                <img
                  src="../../../src/resources/images/products/interior-design-concept-sale-home-260nw-2169578877.webp"
                  alt=""
                  className="w-full h-96"
                />
                <p className="text-lg font-thin mt-5 p-3 flex justify-center items-center">
                  Dép Màu Đen
                  <div className="w-5 h-5 ml-2">
                    <ArrowRight />
                  </div>
                </p>
              </div>
            </div> */}
          </div>

          <div className="flex justify-center mt-5 ">
            <div className="bg-amber-700 p-3 w-28 border text-center text-white ">
              <button>Views all</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
