import {
  SearchIcon,
  CartIcon,
  HeartIcon,
  NoteIcon,
  Minus,
  Plus,
} from "../../../resources/svg/Icon/Icon";
import "./ListCart.css";
const ListCart = () => {
  return (
    <div className="container mx-auto max-w-[1200px]">
      <div>
        <div className="flex items-center bg-gray-100 h-20 p-4 mx-w-[1200px]">
          <ul className="flex gap-2">
            <li className="text-red-500">
              <a href="#">Home </a>
            </li>
            <li> / </li>
            <li>
              <a href="#">Cart</a>
            </li>
          </ul>
        </div>

        <div className="mt-4">
          <div className="bg-white flex border rounded-sm shadow-sm text-sm uppercase tracking-wider text-black font-medium items-center">
            <div className="px-6 py-3 text-left">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-orange-500"
              />
            </div>
            <div className="px-6 py-3 flex-grow">Sản phẩm</div>
            <div className="px-6 py-3 flex-shrink-0 w-32">Đơn Giá</div>
            <div className="px-6 py-3 flex-shrink-0 w-36">Số Lượng</div>
            <div className="px-6 py-3 flex-shrink-0 w-32">Số Tiền</div>
            <div className="px-6 py-3 flex-shrink-0 w-32">Thao Tác</div>
          </div>
          <div className="bg-white mt-4 border mb-5 rounded-sm shadow-sm">
            <div className="flex items-center py-4">
              <div className="px-6">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-orange-500"
                />
              </div>
              <div className="px-6 flex-grow mr-10">
                <div className=" flex gap-5">
                  <div className="w-20 h-20 ">
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                    />
                  </div>
                  <div className="overflow-hidden max-w-60 max-h-14 text-sm">
                    GUDETU Giày nam. Dép mềm mại, thoải mái, dép eva, dép đi
                    trong phòng tắm gia đình chống trượt Dép đi trong nhà dành
                    cho cặp đôi. Dép
                  </div>
                  <div className="overflow-hidden max-w-32 max-h-56">
                    <p className="text-sm text-gray-400">
                      Phân Loại Hàng: dép màu đen
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 flex-shrink-0 w-28">
                <div className="text-sm text-gray-500">$10</div>
              </div>
              <div className="px-6 flex-shrink-0 w-32 ml-5 rounded-sm ">
                <div className="text-sm flex items-center gap-3 text-gray-500">
                  <Minus />
                  <span>2</span>
                  <Plus />
                </div>
              </div>

              <div className="px-6 flex-shrink-0 w-32">
                <div className="text-sm text-gray-500">$20</div>
              </div>
              <div className="px-6 flex-shrink-0 w-32">
                <div className="text-sm text-gray-500">Edit</div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-4 border mb-5 rounded-sm shadow-sm">
            <div className="flex items-center py-4">
              <div className="px-6">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-orange-500"
                />
              </div>
              <div className="px-6 flex-grow mr-10">
                <div className=" flex gap-5">
                  <div className="w-20 h-20 ">
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                    />
                  </div>
                  <div className="overflow-hidden max-w-60 max-h-14 text-sm">
                    GUDETU Giày nam. Dép mềm mại, thoải mái, dép eva, dép đi
                    trong phòng tắm gia đình chống trượt Dép đi trong nhà dành
                    cho cặp đôi. Dép
                  </div>
                  <div className="overflow-hidden max-w-32 max-h-56">
                    <p className="text-sm text-gray-400">
                      Phân Loại Hàng: dép màu đen
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 flex-shrink-0 w-28">
                <div className="text-sm text-gray-500">$10</div>
              </div>
              <div className="px-6 flex-shrink-0 w-32 ml-5 rounded-sm ">
                <div className="text-sm flex items-center gap-3 text-gray-500">
                  <Minus />
                  <span>2</span>
                  <Plus />
                </div>
              </div>

              <div className="px-6 flex-shrink-0 w-32">
                <div className="text-sm text-gray-500">$20</div>
              </div>
              <div className="px-6 flex-shrink-0 w-32">
                <div className="text-sm text-gray-500">Edit</div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-4 border mb-5 rounded-sm shadow-sm">
            <div className="flex items-center py-4">
              <div className="px-6">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-orange-500"
                />
              </div>
              <div className="px-6 flex-grow mr-10">
                <div className=" flex gap-5">
                  <div className="w-20 h-20 ">
                    <img
                      src="../../../src/resources/images/products/90chinh-mau-nen.webp"
                      alt=""
                    />
                  </div>
                  <div className="overflow-hidden max-w-60 max-h-14 text-sm">
                    GUDETU Giày nam. Dép mềm mại, thoải mái, dép eva, dép đi
                    trong phòng tắm gia đình chống trượt Dép đi trong nhà dành
                    cho cặp đôi. Dép
                  </div>
                  <div className="overflow-hidden max-w-32 max-h-56">
                    <p className="text-sm text-gray-400">
                      Phân Loại Hàng: dép màu đen
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 flex-shrink-0 w-28">
                <div className="text-sm text-gray-500">$10</div>
              </div>
              <div className="px-6 flex-shrink-0 w-32 ml-5 rounded-sm ">
                <div className="text-sm flex items-center gap-3 text-gray-500">
                  <Minus />
                  <span>2</span>
                  <Plus />
                </div>
              </div>

              <div className="px-6 flex-shrink-0 w-32">
                <div className="text-sm text-gray-500">$20</div>
              </div>
              <div className="px-6 flex-shrink-0 w-32">
                <div className="text-sm text-gray-500">Edit</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mb-10">
          <div className="h-20 bg-white flex border rounded-sm shadow-sm text-sm uppercase tracking-wider text-black font-medium items-center">
            <div className="px-6 py-3 text-left">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-orange-500"
              />
            </div>
            <div className="px-6 py-3 flex-grow text-lg">Chọn Tất Cả</div>
            <div className="px-6 py-3 flex ">
              <div className="text-lg">Tổng Thành Toán : </div>
              <span className="py-1 "> $10.000đ</span>
            </div>
            <div>
              <button className="px-4 py-3 mr-5 w-48 text-white font-semibold bg-amber-800 hover:bg-orange-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                Mua Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-orange-400 p-5 text-center text-3xl">
        Hoàng Đức Trung
      </footer>
    </div>
  );
};

export default ListCart;
