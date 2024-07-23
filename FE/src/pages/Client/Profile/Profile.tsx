import React, { useState, useEffect } from "react";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import mongoose from "mongoose";

const Profile = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [editingField, setEditingField] = useState(null);
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

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarFile(file); // Lưu file avatar để lưu vào MongoDB
      setProfileInfo({ ...profileInfo, avatar: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: any) => {
    e.preventDefault();
    try {
      const userId = user?.user?._id;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
      }

      // Nếu có chọn ảnh mới, thực hiện cập nhật ảnh đại diện
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const { data } = await instance.put(
          `/auth/${userId}/avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfileInfo({
          ...profileInfo,
          avatar: data.avatar || "",
        });
        alert("Đã cập nhật ảnh đại diện thành công");
      }

      // Tiếp tục cập nhật thông tin người dùng
      await instance.put(`/auth/${userId}`, {
        ...profileInfo,
      });
      fetchUserData();
      alert("Cập nhật thông tin thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.");
    }
  };

  const handleEditField = (fieldName: any) => {
    setEditingField(fieldName); // Lưu tên trường đang chỉnh sửa vào state
  };
  const handleSaveField = () => {
    setEditingField(null); // Đặt lại trường đang chỉnh sửa về null sau khi lưu
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
              <form onSubmit={handleSaveProfile} className="w-full">
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
                  {/* Sử dụng toán tử ba ngôi để điều khiển hiển thị thông tin và input chỉnh sửa */}
                  {editingField === "fullName" ? (
                    <input
                      type="text"
                      name="fullName"
                      value={profileInfo.fullName}
                      onChange={handleInputChange}
                      onBlur={handleSaveField} // Xử lý khi người dùng rời khỏi input
                      className="px-3 py-2 border w-full lg:w-[350px] outline-none"
                      placeholder="Nhập tên của bạn"
                    />
                  ) : (
                    <div className="flex items-center">
                      <p>{profileInfo.fullName}</p>
                      <a
                        href="#"
                        className="underline text-blue-400 ml-2"
                        onClick={() => handleEditField("fullName")} // Xử lý khi người dùng nhấn "Thay đổi"
                      >
                        Thay đổi
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex flex-col lg:flex lg:items-center lg:flex-row gap-x-5 lg:gap-5 py-2 lg:py-3">
                  <p className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Email
                  </p>
                  {/* Tương tự cho các trường thông tin khác */}
                  <div className="flex items-center">
                    {editingField === "email" ? (
                      <input
                        type="text"
                        name="email"
                        value={profileInfo.email}
                        onChange={handleInputChange}
                        onBlur={handleSaveField}
                        className="px-3 py-2 border w-full lg:w-[350px] outline-none"
                        placeholder="Nhập email của bạn"
                      />
                    ) : (
                      <div className="flex items-center">
                        <p>{profileInfo.email}</p>
                        <a
                          href="#"
                          className="underline text-blue-400 ml-2"
                          onClick={() => handleEditField("email")}
                        >
                          Thay đổi
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex lg:items-center lg:flex-row gap-x-5 lg:gap-5 py-2 lg:py-3">
                  <p className="w-36 text-left lg:text-right py-1 text-[#777777]">
                    Số điện thoại
                  </p>
                  {/* Tương tự cho các trường thông tin khác */}
                  <div className="flex items-center">
                    {editingField === "phoneNumber" ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={profileInfo.phoneNumber}
                        onChange={handleInputChange}
                        onBlur={handleSaveField}
                        className="px-3 py-2 border w-full lg:w-[350px] outline-none"
                        placeholder="Nhập phoneNumber của bạn"
                      />
                    ) : (
                      <div className="flex items-center">
                        <p>{profileInfo.phoneNumber}</p>
                        <a
                          href="#"
                          className="underline text-blue-400 ml-2"
                          onClick={() => handleEditField("phoneNumber")}
                        >
                          Thay đổi
                        </a>
                      </div>
                    )}
                  </div>
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
                    onClick={handleSaveProfile}
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
                  onChange={handleAvatarChange}
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
