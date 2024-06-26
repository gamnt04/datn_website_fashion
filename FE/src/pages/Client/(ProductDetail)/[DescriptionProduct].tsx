
const DescriptionProduct = () => {
  return (
    <div>
        
    
    <div className="flex justify-center items-center space-x-10 text-lg text-gray-800 *:duration-300 pt-16 pb-3">
            <div
              className="text-orange-500 cursor-pointer underline underline-offset-8 decoration-2 decoration-[#F68E56] hover:text-orange-500 hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-[#F68E56]"
            >
              Description
            </div>

            {/* <div
              className="cursor-pointer decoration-2 hover:text-orange-500 hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-[#F68E56]"
            >
              Evaluate
            </div>
            <div
              className="cursor-pointer decoration-2 hover:text-orange-500 hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-[#F68E56]"
            >
              Delivery
            </div> */}
            <div
              className="cursor-pointer decoration-2 hover:text-orange-500 hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-[#F68E56]"
            >
              How to use
            </div>
          </div>
          <div className="pl-4 list-disc space-y-2">
            {/* Mo ta */}
          <div className="mt-6 flex flex-col *:mt-4 *:md:text-sm *:mb:text-xs">
            <span>- Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham,Day la mo ta chi tiet cua san pham</span>
            <span>- Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham,Day la mo ta chi tiet cua san pham</span>
            <span>- Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham,Day la mo ta chi tiet cua san pham</span>
            <span>- Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham, Day la mo ta chi tiet cua san pham,Day la mo ta chi tiet cua san pham</span>
          </div>
            <div className="mx-auto bg-[#FFFBF8] mt-5">
              {/* header danh gia */}
              {/* <div className="flex p-8">
                <div className="">
                  <p className="">5 tren 5</p>
                  <div className="flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
                <div className="flex space-x-3 pl-[15px] text-[14px] ">
                  <div className="border-black border-[1px] px-[10px]  ">
                    Tất cả
                  </div>
                  <div className="border-black border-[1px]  p-3">5 sao</div>
                  <div className="border-black border-[1px]  p-3">4 sao</div>
                  <div className="border-black border-[1px]  p-3">3 sao</div>
                  <div className="border-black border-[1px]  p-3">2 sao</div>
                  <div className="border-black border-[1px]  p-3">1 sao</div>
                  <div className="border-black border-[1px]  p-3">
                    Có bình luận
                  </div>
                  <div className="border-black border-[1px]  p-3">
                    Có hình ảnh/ Video
                  </div>
                </div>
              </div> */}
              {/* header danh gia */}
            </div>

            {/* nguoi dung danh gia */}
            {/* <div className=" mx-auto ">
              <div className="flex pl-5 ">
                <div>
                  <img
                    src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                    alt=""
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <div className="pl-5 ">
                  <div className="text-[12px]">
                    <p>Ten nguoi dung</p>
                    <div className="flex pt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div> */}

                    {/* time reviews*/}
                    {/* <div className="flex pt-1">
                      <p>2024-01-01</p>
                      <p className="pl-2">11:00</p>
                      <p className="pl-2">|</p>
                      <p className="pl-2">Phân loại: xanh lục(L)</p>
                    </div> */}
                    {/* end time reviews*/}
                  {/* </div> */}

                  {/* <div className="text-14px">
                    <p className="pt-3 ">Màu sắc:</p>
                    <p className="pt-3">Description:</p>
                  </div> */}

                  {/* pictures reviews */}
                  {/* <div className="flex pt-3">
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                      className="w-16 h-16  object-cover"
                    />
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                      className="w-20 h-16 pl-2 object-cover"
                    />
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                      className="w-20 h-16 pl-2 object-cover"
                    />
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                      className="w-20 h-16 pl-2 object-cover"
                    />
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                      className="w-20 h-16 pl-2 object-cover"
                    />
                  </div> */}
                  {/*end pictures reviews */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
            {/* end nguoi dung danh gia */}
          </div>
           
      </div>
   )
}

export default DescriptionProduct