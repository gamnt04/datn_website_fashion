import Profile from "../pages/UI/Profile";
function App() {
  return (
    <>
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex">
          <div className="w-[19%] bg-[#F5F5F5]">
            <div className="flex px-7 pt-[15px]">
              <div className=" px-3">
                <img
                  className="w-[46px] h-[46px] rounded-full"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
              </div>
              <div className="">
                <h3 className="text-[#333] font-semibold text-sm">User Name</h3>
                <a className=" text-[#9B9B9B] font-normal text-xs">Sửa Hồ Sơ</a>
              </div>
            </div>
          </div>
          <div className="w-[81%] bg-[#FFFFFF]">
            <div className="px-7 pt-[15px]">
              <div className="border-b-2">
                <h2>Hồ Sơ Của Tôi</h2>
                <p className="pb-4 text-sm">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
              </div>
              <div className="pt-[25px]">
                <div className="">
                  <form action="">
                    <table>
                      <tr>
                        <td className="pb-[50px] pt-[13px] text-sm text-right w-[135px]">
                          Tên đăng nhập
                        </td>
                        <td>
                          <div className="px-4 pb-[7px]">
                            <div className="">
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="user name"
                                className="input-value w-[393px] h-[40px] border-slate-400 text-[#000000] text-sm px-5   "
                              />
                            </div>
                            <div className="py-2">
                              <p className="text-[#9B9B9B] text-sm leading-5  ">
                                Tên Đăng nhập chỉ có thể thay đổi một lần.
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-[50px] pt-[13px] text-sm text-right w-[135px]">
                          Tên
                        </td>
                        <td>
                          <div className="px-4">
                            <div className="">
                              <input
                                type="text"
                                name=""
                                id=""
                                placeholder="user name"
                                className="input-value w-[393px] h-[40px] border-slate-400 text-[#000000] text-sm px-5   "
                              />
                            </div>
                            <div className="py-2">
                              <p className="text-red-600 text-sm leading-5 ">
                                Tên tài khoản tối thiểu 10 kí tự
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-[50px] pt-[13px] text-sm text-right w-[135px]">
                          Email
                        </td>
                        <td>
                          <div className="px-4 pb-[36px]">
                            <div className="flex">
                              <p className="text-black-600 text-sm leading-5">
                                ch*************@gmail.com
                              </p>{" "}
                              <a
                                href=" "
                                className="text-sm text-sky-600 underline px-4"
                              >
                                Thay Đổi
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-[50px] pt-[13px] text-sm text-right w-[135px]">
                          Số điện thoại
                        </td>
                        <td>
                          <div className="px-4 pb-[36px]">
                            <div className="flex">
                              <a
                                href=" "
                                className="text-sm text-sky-600 underline "
                              >
                                Thêm Mới
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
