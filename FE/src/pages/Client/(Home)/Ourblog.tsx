import img_blog from '../../../assets/Images/Products/imgHomeBlog1.jpg'


const Ourblog = () => {

    const a: Array<number> = [1, 2, 3];

    return (
        <div className='py-16 border-b'>
            <h2 className="text-[42px] font-medium text-center text-[#222222]">
                Our Blog
            </h2>
            <p className="font-normal text-center text-[#999999] mt-6">
                Find a bright ideal to suit your taste with our great selection of
                suspension.
            </p>

            <div className="grid grid-cols-1 gap-9 mt-14 sm:grid-cols-2 md:grid-cols-3 *:rounded">
                {a?.map(() =>
                (
                    <div className="overflow-hidden hover:shadow-xl group pb-10 duration-500 cursor-pointer">
                        <img
                            src={img_blog}
                            alt=""
                            className="w-full rounded group-hover:scale-105 h-[215px] transition-transform duration-300 transform"
                        />
                        <div className="px-8 ">
                            <h3 className="text-2xl font-normal text-[#222222] mt-6">
                                Urna pretium elit mauris cursus
                            </h3>
                            <p className="text-[12.5px] font-normal text-[#999999]  mt-6">
                                August 29, 2023
                            </p>
                            <p className="text-[16px] font-normal text-[#999999] mt-6 ">
                                Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet
                                Vestibulum faucibus. At Nulla id tincidunt ut sed semper vel
                                Lorem...
                            </p>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Ourblog