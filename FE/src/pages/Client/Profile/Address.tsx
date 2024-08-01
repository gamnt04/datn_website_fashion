import { Auth } from "../../../common/interfaces/Auth";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import ProfileHook from "../../../common/hooks/Settings/ProfileHook";
import { Button } from "antd";
import { useState } from "react";
import { Add_Address } from "../../../components/common/Client/_component/Address";

const Address = () => {
  const { isLoading, isPending, isError, error } = ProfileHook();
  const [address, setAddress] = useState(false);
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data } = List_Auth(userId);


  function handle_add_default_address(id_address: string) {
    console.log(id_address)
  }
  const handleAddress = () => {
    setAddress(!address);
    if (address) setAddress(false);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isPending) return <div>Pending...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      <div>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1>Địa chỉ của tôi</h1>
          <button onClick={handleAddress} className="flex items-center gap-2 bg-black text-white px-3 py-3 rounded-md text-sm">
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
          {data?.address?.map((address: Auth) => (
            <div
              key={address?._id}
              className="flex justify-between items-center my-5 border-b pb-6"
            >
              <div className="py-1">
                <h1>
                  {address.fullName}{" "}
                  <span className="px-2 text-gray-400">|</span>{" "}
                  <span className="text-gray-400">{address?.phoneNumber}</span>
                </h1>
                <span className="text-gray-400">{address?.addressDetails}</span>
                <div className="flex gap-3 mt-3">
                  <button className="border border-stone-300 text-gray-400 px-4 py-2 rounded-md text-sm">
                    Mặc định
                  </button>
                </div>
              </div>
              <div className="">
                <div className="hidden lg:block">
                  <div className="flex gap-2 justify-end text-blue-400 py-2">
                    <a href="#">Cập nhật</a>
                    <button>Xóa</button>
                  </div>
                  <Button onClick={() => handle_add_default_address(address?._id)}>Thiết lập mặc định</Button>
                </div>
                <div className="block lg:hidden">
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
        {address && (
          <Add_Address handleAddress={handleAddress}></Add_Address>
        )}
      </div>
    </>
  );
};

export default Address;
