import React, { useState, useEffect } from "react";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";

const Profile = () => {
const [avatarFile, setAvatarFile] = useState(null);
   const [user, setUser] = useLocalStorage("user", {});
  const [profileInfo, setProfileInfo] = useState({
    userName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = user?.user?._id;
      const { data } = await instance.get(`/auth/${userId}`);
      const userData = data; // Cần phải dựa vào cấu trúc phản hồi từ backend để lấy dữ liệu người dùng
      if (userData) {
        setProfileInfo({
          userName: userData.userName || "",
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phone || "",
          birthDate: userData.birthDate || "",
          avatar: userData.avatar || "",
        });
      } else {
        console.error("Không có dữ liệu người dùng trả về từ backend");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };


  return (
    <>
      <div>
        <div className="border-b-2">
          <h2 className="text-xl">Hồ Sơ Của Tôi</h2>
          <p className="py-2 text-sm">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="py-8">
          <div className="flex flex-row flex-wrap lg:flex-nowrap text-sm">
            <div className="basis-full order-2 lg:order-1 lg:basis-2/3">
              <form  className="w-full">
                <div className="flex items-center gap-5 py-2 lg:py-3">
                  <p className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Tên đăng nhập
                  </p>
                  <p>{profileInfo.userName}</p>
                </div>
                <div className="flex flex-col lg:flex lg:items-center lg:flex-row gap-x-5 lg:gap-5 py-2 lg:py-3">
                  <label className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileInfo.fullName}
                    onChange={handleInputChange}
                    className="px-3 py-2 border w-full lg:w-[350px] outline-none"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                <div className="flex flex-col lg:flex lg:items-center lg:flex-row gap-x-5 lg:gap-5 py-2 lg:py-3">
                  <p className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Email
                  </p>
                  <div className="flex justify-between gap-3">
                    <p>{profileInfo.email}</p>
                    <a
                      href="#"
                      className="underline text-blue-400"
                    >
                      Thay đổi
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-5 py-2 lg:py-3">
                  <p className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Số điện thoại
                  </p>
                  <p>{profileInfo.phoneNumber}</p>
                  <a
                    href="#"
                    className="underline text-blue-400"
                  >
                    Thêm
                  </a>
                </div>
                <div className="flex items-center gap-5 py-2 lg:py-3">
                  <p className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Ngày sinh
                  </p>
                  <input
                    type="date"
                    name="birthDate"
                    value={profileInfo.birthDate}
                    onChange={handleInputChange}
                    className="w-48 px-2 py-1 border border-gray-300 rounded outline-none"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-6 my-6"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
            <div className="order-1 border-b p-3 my-4 basis-full lg:order-2 lg:border-b-0 lg:border-l-2 lg:basis-1/3">
              <div className="flex justify-center">
                <img
                  src={profileInfo.avatar || "https://picsum.photos/300/300"}
                  className="w-44 h-44 rounded-full"
                  alt="Avatar"
                />
              </div>
               <div className="flex justify-center">
                <input
                  type="file"
                  accept="image/*"
               
                  className="hidden"
                  id="avatar-input"
                />
                <label
                  htmlFor="avatar-input"
                  className="border py-3 px-6 my-9 rounded-lg cursor-pointer"
                >
                  Chọn ảnh
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
