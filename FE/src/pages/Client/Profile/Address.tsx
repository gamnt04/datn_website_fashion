import { useState, useEffect } from "react";
import { Auth } from "../../../common/interfaces/Auth";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import instance from "../../../configs/axios";

const Address = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    _id: "",
    fullName: "",
    phoneNumber: "",
    addressDetails: "",
    addressType: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [selectedAddress, setSelectedAddress] = useState<Auth | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/auth/${userId}`);
        setAddresses(data);
        // console.log(data?.address[0].phoneNumber);
      } catch (error) {}
    })();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const { data } = await instance.get(`/auth/${userId}`);
      setAddresses(data?.address || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleUpdate = (address: Auth) => {
    setSelectedAddress(address);
    setAddressInfo({
      _id: address._id,
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressDetails: address.addressDetails,
      addressType: address.addressType,
    });
    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo({
      ...addressInfo,
      [name]: value,
    });
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const confirm = window.confirm("Bạn có chắc muốn xóa địa chỉ?");
      if (confirm) {
        await instance.delete(`/auth/${userId}/${addressId}`);
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== addressId)
        );
        alert("Xóa địa chỉ thành công");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedAddress?._id);

    if (!selectedAddress) {
      console.error("Không có địa chỉ được chọn để cập nhật");
      return;
    }
    try {
      await instance.put(
        `/auth/${userId}/${selectedAddress?._id}`,
        addressInfo
      );

      fetchAddresses(); // Refresh addresses after successful update
      setIsOpenUpdate(false); // Close update modal
      alert("Cập nhật địa chỉ thành công");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      alert("Đã xảy ra lỗi khi cập nhật địa chỉ. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1>Địa chỉ của tôi</h1>
          <button
            className="flex items-center gap-2 bg-black text-white px-3 py-3 rounded-md text-sm"
            onClick={handleToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="hidden lg:block">Thêm địa chỉ mới</span>
          </button>
        </div>
        <div className="px-5 py-4">
          <h2 className="py-2">Địa chỉ</h2>
          {addresses?.address?.map((address: Auth) => (
            <div
              key={address._id}
              className="flex justify-between items-center my-5 border-b pb-6"
            >
              <div className="py-1">
                <h1>
                  {address.fullName}{" "}
                  <span className="px-2 text-gray-400">|</span>{" "}
                  <span className="text-gray-400">{address.phoneNumber}</span>
                </h1>
                <span className="text-gray-400">{address.addressDetails}</span>
                <div className="flex gap-3 mt-3">
                  <button className="border border-stone-300 text-gray-400 px-4 py-2 rounded-md text-sm">
                    Mặc định
                  </button>
                </div>
              </div>
              <div className="">
                <div className="hidden lg:block">
                  <div className="flex gap-2 justify-end text-blue-400 py-2">
                    <a href="#" onClick={() => handleToggleUpdate(address)}>
                      Cập nhật
                    </a>
                    <button onClick={() => handleDeleteAddress(address._id!)}>
                      Xóa
                    </button>
                  </div>
                  <button className="border px-4 py-2 rounded-md text-sm text-gray-400">
                    Thiết lập mặc định
                  </button>
                </div>
                <div className="block lg:hidden" onClick={handleToggleUpdate}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for add new address */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-5 border rounded-lg relative w-[400px] lg:w-[500px]">
            <h1 className="py-3 text-center font-medium">Địa chỉ mới</h1>
            <form onSubmit={handleAddAddress}>
              <div className="w-full border px-2 py-2 outline-none flex gap-3 my-3">
                <input
                  type="text"
                  name="fullName"
                  value={addressInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={addressInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  required
                />
              </div>
              <div className="my-3 px-2 py-2 border outline-none">
                <input
                  type="text"
                  className="w-full"
                  name="address"
                  value={addressInfo.address}
                  onChange={handleInputChange}
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                  required
                />
              </div>
              <div className="my-3 px-2 py-2 border outline-none">
                <input
                  type="text"
                  className="w-full"
                  name="addressType"
                  value={addressInfo.addressType}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ cụ thể"
                  required
                />
              </div>
              <div className="my-3">
                <p>Loại địa chỉ:</p>
                <div className="flex gap-4 border px-3 py-2 my-2">
                  <button type="button">Nhà riêng</button>
                  <button type="button">Văn phòng</button>
                </div>
              </div>
              <div className="my-3 flex items-center gap-3">
                <input type="radio" /> <span>Đặt làm mặc định</span>
              </div>
              <div className="flex justify-center pt-5 w-full">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-3 rounded-md"
                >
                  Hoàn Thành
                </button>
              </div>
            </form>
            <button
              onClick={handleToggle}
              className="bg-red-500 text-white absolute top-5 right-5 rounded-md px-2 py-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Modal for update address */}
      {isOpenUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-5 border rounded-lg relative w-[400px] lg:w-[500px]">
            <h1 className="py-3 text-center font-medium">Cập nhật địa chỉ</h1>
            <form onSubmit={handleUpdateAddress}>
              <div className="w-full border px-2 py-2 outline-none flex gap-3 my-3">
                <input
                  type="text"
                  name="fullName"
                  value={addressInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={addressInfo.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Số điện thoại"
                  required
                />
              </div>
              <div className="my-3 px-2 py-2 border outline-none">
                <input
                  type="text"
                  className="w-full"
                  name="addressDetails"
                  value={addressInfo.addressDetails}
                  onChange={handleInputChange}
                  placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                  required
                />
              </div>
              <div className="my-3 px-2 py-2 border outline-none">
                <input
                  type="text"
                  className="w-full"
                  name="addressType"
                  value={addressInfo.addressType}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ cụ thể"
                  required
                />
              </div>
              <div className="my-3 flex justify-center pt-5 w-full">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-3 rounded-md"
                >
                  Cập nhật
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsOpenUpdate(false)}
              className="bg-red-500 text-white absolute top-5 right-5 rounded-md px-2 py-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
