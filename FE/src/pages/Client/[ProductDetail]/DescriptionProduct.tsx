import { useState } from "react"
import { IProduct } from "../../../common/interfaces/Product";

const DescriptionProduct = ({product} : IProduct) => {
  const [toggleDes, setTogleDes] = useState<boolean>(true);
  return (
    <>
      {/* description */}
      < div className="flex flex-col border-t lg:py-10 lg:mt-10 mb:py-[34px] mb:mt-8" >
        {/* menu description */}
        <ul className="flex items-center gap-x-8 border-b lg:pb-6 mb:pb-5 *:whitespace-nowrap *:px-6 *:lg:py-2.5 *:mb:py-[7px] *:rounded *:border *:place-items-center *:lg:text-base *:mb:text-xs" >
          <button onClick={() => setTogleDes(true)} className={`btn_show_description grid hover:border-[#05422C] hover:bg-[#F2F6F4] ${toggleDes ? 'border-[#05422C] text-[#05422C] bg-[#F2F6F4]' : ''}`}>Mô tả</button>
          <button onClick={() => setTogleDes(false)} className={`btn_show_description grid hover:border-[#05422C] hover:bg-[#F2F6F4] ${toggleDes ? '' : 'border-[#05422C] text-[#05422C] bg-[#F2F6F4]'}`}>
            Đánh giá(350)
          </button>
        </ul >
        {/* text description */}
        <div className={toggleDes ? 'block' : 'hidden'} >
          <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
            <p>{product?.description_product}</p>
          </section>
        </div >
        {/* detail comment */}
        <section className={toggleDes ? 'hidden' : 'block'}  >
          <div className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:pt-6 mb:pt-5 mb:pb-0">
            {/* content comment 1 */}
            <div className="border rounded-2xl lg:p-6 mb:p-5">
              {/* user and time comment */}
              <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                {/* <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' /> */}
                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Vikki Starr <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
              </div>
              {/* text comment */}
              <section className="flex flex-col gap-y-4">
                <nav className="flex items-center gap-x-1">
                  {/* <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' /> */}
                </nav>
                <p className="text-[#1A1E26] text-base">Ahihihihihihihihhi san pham totooooooooo ahihihihihih</p>
              </section>
            </div>
            {/* content comment 2 */}
            <div className="border rounded-2xl lg:p-6 mb:p-5">
              {/* user and time comment */}
              <div className="flex items-center *:flex *:items-center gap-x-4 border-b border-[#F4F4F4] pb-4 mb-4">
                {/* <Image width={36} height={36} src="/Images/vikki_user_icon.png" alt='' /> */}
                <strong className="text-base text-[#1A1E26] font-medium gap-x-4">Terry Baskey <span className="text-sm text-[#9D9EA2] font-light">|</span> <span className="text-sm text-[#9D9EA2] font-light">January 15, 2023</span></strong>
              </div>
              {/* text comment */}
              <section className="flex flex-col gap-y-4">
                <nav className="flex items-center gap-x-1">
                  {/* <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' />
      <Image width={100} height={100} src="/Images/star.png" alt='' /> */}
                </nav>
                <p className="text-[#1A1E26] text-base">Ahihihihihihihihhi san pham totooooooooo ahihihihihih</p>
              </section>
            </div>
            {/*btn show more */}
            <div className="flex justify-center my-1">
              <button className="px-5 py-2 text-[#17AF26] text-sm rounded-[100px] border hover:bg-[#F9F9F9] cursor-pointer duration-300">Show
                More</button>
            </div>
            {/* add comment */}
            <div className="flex flex-col gap-y-6 border-t lg:pt-7 lg:pb-[22px]">
              <form className="-mt-1.5">
                <span>Your Review</span>
                <div className="overflow-hidden lg:p-4 rounded-lg border border-gray-200 shadow-sm focus-within:border-none focus-within:ring-1 focus-within:none mt-2">
                  <textarea id="OrderNotes" className="w-full resize-none outline-none border-none align-top focus:ring-0 sm:text-sm" rows={3} placeholder="Enter your review" defaultValue={""} />
                </div>
                <button className="px-10 py-4 bg-black rounded hover:scale-105 duration-300 text-base text-white mt-4">Submit</button>
              </form>
            </div>
          </div>
        </section >
      </div >
    </>
  )
}

export default DescriptionProduct