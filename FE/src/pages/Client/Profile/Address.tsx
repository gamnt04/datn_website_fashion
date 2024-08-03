import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Button, message, Popconfirm } from "antd";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import ProfileHook from "../../../common/hooks/Settings/ProfileHook";
import {
  Add_Address,
  Update_Address,
} from "../../../components/common/Client/_component/Address";

const Address = () => {
  const { isLoading, isError, error } = ProfileHook();
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { data } = useQuery({
    queryKey: ["AUTH_KEY", userId],
    queryFn: async () => {
      const { data } = await instance.get(`/auth/address/${userId}`);
      return data;
    },
  });
  console.log(data?.address?.fullName);

  const { mutate: deleteAddress } = useMutation({
    mutationFn: async () => {
      await instance.delete(`/auth/address/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["AUTH_KEY", userId],
      });
      message.open({
        type: "success",
        content: "Xóa địa chỉ thành công",
      });
    },
    onError: () => {
      message.open({
        type: "error",
        content: "Xóa địa chỉ thất bại!",
      });
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const handleAddress = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdateAddress = () => {
    setIsOpenUpdate(!isOpenUpdate);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <div>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1>Địa chỉ của tôi</h1>
          {data?.address ? (
            ""
          ) : (
            <div>
              <button
                onClick={handleAddress}
                className="flex items-center gap-2 bg-black text-white px-3 py-3 rounded-md text-sm"
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
          )}
        </div>

        <div className="px-5 py-4">
          {data?.address ? (
            <div className="flex justify-between items-center my-5 border-b pb-6">
              <div className="py-1">
                <h1>
                  {data?.address?.fullName}{" "}
                  <span className="px-2 text-gray-400">|</span>{" "}
                  <span className="text-gray-400">
                    {data?.address?.phoneNumber}
                  </span>
                </h1>
                <div className="flex text-gray-400">
                  <span>{data?.address?.addressDetails}</span>
                  <span>-</span>
                  <span>{data?.address?.address}</span>
                </div>
                {/* {address.checked && (
                  <div className="flex gap-3 mt-3">
                    <button className="border border-stone-300 bg-[#000000] text-white px-4 py-2 rounded-md text-sm">
                      Mặc định
                    </button>
                  </div>
                )} */}
              </div>
              <div>
                <div className="hidden lg:block">
                  <div className="flex gap-2 justify-end text-blue-400 py-2">
                    <a onClick={handleUpdateAddress} href="#">
                      Cập nhật
                    </a>
                    <Popconfirm
                      title="Xóa địa chỉ"
                      description="Bạn có chắc chắn muốn xóa địa chỉ này không?"
                      onConfirm={() => deleteAddress(userId)}
                      okText="Xóa"
                      cancelText="Hủy"
                    >
                      <button>Xóa</button>
                    </Popconfirm>
                  </div>
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
          ) : (
            "Chưa cập nhật địa chỉ"
          )}
        </div>

        {isOpen && <Add_Address handleAddress={handleAddress} />}
        {isOpenUpdate && (
          <Update_Address handleUpdateAddress={handleUpdateAddress} />
        )}
      </div>
    </>
  );
};

export default Address;
