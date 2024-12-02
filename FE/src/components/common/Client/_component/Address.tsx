import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Popconfirm,
  Select
} from "antd";
import useLocalStorage from "../../../../common/hooks/Storage/useStorage";
import instance from "../../../../configs/axios";
// import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
mapboxgl.accessToken =
  "pk.eyJ1IjoibmFkdWMiLCJhIjoiY200MmNkdnU1Mmo5dTJscXQ0cWFtNGJqeCJ9.3pBGjdx-XHSvKR3BIg-e0Q";
type FieldType = {
  userId: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  addressDetails: string;
  checked: boolean;
  newAddress: string;
};
// export const Add_Address = ({ handleAddress }: any) => {
//   const [user] = useLocalStorage("user", {});
//   const userId = user?.user?._id;
//   const querryClient = useQueryClient();
//   const [form] = Form.useForm();
//   const [messageApi, contextHolder] = message.useMessage();

//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [villages, setVillages] = useState([]);

//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       // Fetch data for provinces
//       const provincesData = await instance.get("/api/provinces");
//       setProvinces(provincesData.data);

//       // Initially empty districts, wards, and villages
//       setDistricts([]);
//       setWards([]);
//       setVillages([]);
//     }

//     fetchData();
//   }, []);

//   const handleProvinceChange = async (provinceId: string) => {
//     setSelectedProvince(provinceId);
//     setSelectedDistrict(null);
//     setSelectedWard(null);

//     // Fetch districts based on selected province
//     const districtsData = await instance.get(
//       `/api/districts?province=${provinceId}`
//     );
//     setDistricts(districtsData.data);

//     // Reset wards and villages
//     setWards([]);
//     setVillages([]);
//   };

//   const handleDistrictChange = async (districtId: string) => {
//     setSelectedDistrict(districtId);
//     setSelectedWard(null);

//     // Fetch wards based on selected district
//     const wardsData = await instance.get(`/api/wards?district=${districtId}`);
//     setWards(wardsData.data);

//     // Reset villages
//     setVillages([]);
//   };

//   const handleWardChange = async (wardId: string) => {
//     setSelectedWard(wardId);

//     // Fetch villages based on selected ward
//     const villagesData = await instance.get(`/api/villages?ward=${wardId}`);
//     setVillages(villagesData.data);
//   };

//   const { mutate } = useMutation({
//     mutationFn: async (formData) => {
//       const { data } = await instance.post(`/auth/add_address`, formData);
//       form.resetFields();
//       return data;
//     },
//     onSuccess: () => {
//       querryClient.invalidateQueries({
//         queryKey: ["AUTH_KEY"],
//       });
//       messageApi.open({
//         type: "success",
//         content: "Thêm địa chỉ thành công",
//       });
//     },
//     onError: () => {
//       messageApi.open({
//         type: "error",
//         content: "Thêm địa chỉ thất bại!",
//       });
//     },
//   });

//   const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
//     const data_form: any = {
//       userId: userId,
//       newAddress: values,
//       setDefault: values.checked, // Gửi thông tin về việc thiết lập địa chỉ làm mặc định
//     };
//     mutate(data_form);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[500px]">
//         <h1 className="py-3 font-medium text-center">Địa chỉ mới</h1>
//         {contextHolder}
//         <Form
//           form={form}
//           name="basic"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             name="fullName"
//             className="w-full my-3"
//             rules={[
//               { required: true, message: "Vui lòng nhập họ và tên!" },
//               { min: 3, message: "Tên phải có ít nhất 3 ký tự!" },
//             ]}
//           >
//             <Input
//               className="w-full px-2 py-2 border rounded focus:ring-0"
//               placeholder="Họ và tên"
//             />
//           </Form.Item>

//           <Form.Item
//             name="phoneNumber"
//             className="w-full my-3"
//             rules={[
//               { required: true, message: "Vui lòng nhập số điện thoại!" },
//               {
//                 pattern: /^[0-9]{10,11}$/,
//                 message: "Số điện thoại không hợp lệ!",
//               },
//             ]}
//           >
//             <Input
//               className="w-full px-2 py-2 border rounded focus:ring-0"
//               placeholder="Số điện thoại"
//             />
//           </Form.Item>
//           <Form.Item
//             name="province"
//             className="w-full my-3"
//             rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
//           >
//             <Select
//               placeholder="Chọn thành phố"
//               onChange={handleProvinceChange}
//               className="w-full"
//             >
//               {provinces.map((province) => (
//                 <Option key={province.id} value={province.id}>
//                   {province.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="district"
//             className="w-full my-3"
//             rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}
//           >
//             <Select
//               placeholder="Chọn huyện"
//               onChange={handleDistrictChange}
//               disabled={!selectedProvince}
//               className="w-full"
//             >
//               {districts.map((district) => (
//                 <Option key={district.id} value={district.id}>
//                   {district.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="ward"
//             className="w-full my-3"
//             rules={[{ required: true, message: "Vui lòng chọn xã!" }]}
//           >
//             <Select
//               placeholder="Chọn xã"
//               onChange={handleWardChange}
//               disabled={!selectedDistrict}
//               className="w-full"
//             >
//               {wards.map((ward) => (
//                 <Option key={ward.id} value={ward.id}>
//                   {ward.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="village"
//             className="w-full my-3"
//             rules={[{ required: true, message: "Vui lòng chọn thôn!" }]}
//           >
//             <Select
//               placeholder="Chọn thôn"
//               disabled={!selectedWard}
//               className="w-full"
//             >
//               {villages.map((village) => (
//                 <Option key={village.id} value={village.id}>
//                   {village.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="addressDetails"
//             className="w-full my-3"
//             rules={[
//               { required: true, message: "Vui lòng nhập địa chỉ cụ thể!" },
//             ]}
//           >
//             <Input
//               className="w-full px-2 py-2 border rounded focus:ring-0"
//               placeholder="Địa chỉ cụ thể"
//             />
//           </Form.Item>

//           <Form.Item
//             className="flex items-center w-full gap-3 my-3"
//             name="checked"
//             valuePropName="checked"
//           >
//             <Checkbox>Đặt làm mặc định</Checkbox>
//           </Form.Item>

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button htmlType="submit" className="h-10 text-white bg-black">
//               Hoàn Thành
//             </Button>
//           </Form.Item>
//         </Form>
//         <Button
//           onClick={handleAddress}
//           className="absolute w-8 h-8 px-2 py-2 border-0 rounded hover:bg-slate-100 hover:rounded-full hover:border-2 top-5 right-5"
//         >
//           <CloseOutlined />
//         </Button>
//       </div>
//     </div>
//   );
// };

// const { Option } = Select;
// interface Ward {
//   name: string;
//   code: number;
//   division_type: string;
//   codename: string;
//   district_code: number;
// }

// interface District {
//   name: string;
//   code: number;
//   division_type: string;
//   codename: string;
//   province_code: number;
//   wards: Ward[]; // Các xã/phường của quận/huyện
// }
// export const Add_Address = ({ handleAddress }: any) => {
//   // const [user] = useLocalStorage("user", {});
//   // const userId = user?.user?._id;
//   // const userRole = user?.user?.role;
//   // const querryClient = useQueryClient();
//   // const [form] = Form.useForm();
//   // const [messageApi, contextHolder] = message.useMessage();

//   // const { mutate } = useMutation({
//   //   mutationFn: async (formData) => {
//   //     if (userRole === "courier") {
//   //       const { data } = await instance.post(`/shippers/add_address`, formData);
//   //       form.resetFields();
//   //       return data;
//   //     } else {
//   //       const { data } = await instance.post(`/auth/add_address`, formData);
//   //       form.resetFields();
//   //       return data;
//   //     }
//   //   },
//   //   onSuccess: () => {
//   //     querryClient.invalidateQueries({
//   //       queryKey: ["AUTH_KEY"]
//   //     });
//   //     messageApi.open({
//   //       type: "success",
//   //       content: "Thêm địa chỉ thành công"
//   //     });
//   //   },
//   //   onError: () => {
//   //     messageApi.open({
//   //       type: "error",
//   //       content: "Thêm địa chỉ thất bại!"
//   //     });
//   //   }
//   // });

//   // const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
//   //   const data_form: any = {
//   //     userId: userId,
//   //     newAddress: values,
//   //     setDefault: values.checked
//   //   };

//   //   mutate(data_form);
//   // };
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [wards, setWards] = useState<Ward[]>([]);
//   const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
//   const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);

//   useEffect(() => {
//     fetchProvinces();
//   }, []);

//   const fetchProvinces = async () => {
//     try {
//       const response = await fetch("https://provinces.open-api.vn/api/p/");
//       const data = await response.json();
//       setProvinces(data);
//     } catch (error) {
//       message.error("Lỗi khi tải danh sách tỉnh/thành phố.");
//     }
//   };
//   const fetchDetailProvinces = async (selectedProvince: number) => {
//     try {
//       const response = await fetch(
//         `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=3`
//       );
//       const data = await response.json();
//       setDistricts(data.districts);
//     } catch (error) {
//       message.error("Lỗi khi tải danh sách quận/huyện");
//     }
//   };
//   const handleProvinceChange = (value: number) => {
//     setSelectedProvince(value);
//     setSelectedDistrict(null);
//     setDistricts([]);
//     setWards([]);
//     fetchDetailProvinces(value);
//   };
//   console.log("setSelectedProvince", selectedProvince);
//   console.log("setSelectedDistrict", selectedDistrict);
//   console.log("setDistricts", districts);
//   console.log("setWards", wards);

//   const handleDistrictChange = (value: number) => {
//     setSelectedDistrict(value);
//     const selectedDistrictData = districts.find(
//       (district) => district.code === value
//     );

//     if (selectedDistrictData) {
//       setWards(selectedDistrictData.wards);
//     } else {
//       setWards([]);
//     }
//   };
//   const handleSubmit = (values: any) => {
//     console.log("Form values: ", values);
//     message.success("Địa chỉ đã được lưu!");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white p-5 border rounded relative w-[600px] lg:w-[600px]">
//         <h1 className="py-3 font-medium text-center">Địa chỉ mới</h1>
//         {/* {contextHolder} */}
//         {/* <Form
//           form={form}
//           name="basic"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
// <Form.Item
//   name="fullName"
//   className="w-full my-3"
//   rules={[
//     { required: true, message: "Vui lòng nhập họ và tên!" },
//     { min: 3, message: "Tên phải có ít nhất 3 ký tự!" },
//   ]}
// >
//   <Input
//     className="w-full px-2 py-2 border rounded focus:ring-0"
//     placeholder="Họ và tên"
//   />
// </Form.Item>

// <Form.Item
//   name="phoneNumber"
//   className="w-full my-3"
//   rules={[
//     { required: true, message: "Vui lòng nhập số điện thoại!" },
//     {
//       pattern: /^[0-9]{10,11}$/,
//       message: "Số điện thoại không hợp lệ!",
//     },
//   ]}
// >
//   <Input
//     className="w-full px-2 py-2 border rounded focus:ring-0"
//     placeholder="Số điện thoại"
//   />
// </Form.Item>

// <Form.Item
//   name="address"
//   className="w-full my-3"
//   rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
// >
//   <Input
//     className="w-full px-2 py-2 border rounded focus:ring-0"
//     placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
//   />
// </Form.Item>

// <Form.Item name="addressDetails" className="w-full my-3"
//   rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể!" }]}
// >
//   <Input
//     className="w-full px-2 py-2 border rounded focus:ring-0"
//     placeholder="Địa chỉ cụ thể"
//   />
// </Form.Item>

// <Form.Item
//   className="flex items-center w-full gap-3 my-3"
//   name="checked"
//   valuePropName="checked"
// >
//   <Checkbox>Đặt làm mặc định</Checkbox>
// </Form.Item>

// <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//   <Button htmlType="submit" className="h-10 text-white bg-black">
//     Hoàn Thành
//   </Button>
// </Form.Item>
//         </Form> */}
//         <Form onFinish={handleSubmit} layout="vertical">
//           <div style={{ display: "flex", gap: "16px" }}>
//             {/* Province */}
//             <Form.Item
//               name="province"
//               label="Tỉnh/Thành phố"
//               rules={[
//                 { required: true, message: "Vui lòng chọn tỉnh/thành phố!" }
//               ]}
//               style={{ flex: 1 }}
//             >
//               <Select
//                 placeholder="Chọn tỉnh/thành phố"
//                 onChange={handleProvinceChange}
//               >
//                 {provinces?.map((province: any) => (
//                   <Option key={province.code} value={province.code}>
//                     {province.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {/* District */}
//             <Form.Item
//               name="district"
//               label="Quận/Huyện"
//               rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
//               style={{ flex: 1 }}
//             >
//               <Select
//                 placeholder="Chọn quận/huyện"
//                 onChange={handleDistrictChange}
//                 disabled={!selectedProvince}
//               >
//                 {districts?.map((district: any) => (
//                   <Option key={district.code} value={district.code}>
//                     {district.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {/* Ward */}
//             <Form.Item
//               name="ward"
//               label="Phường/Xã"
//               rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
//               style={{ flex: 1 }}
//             >
//               <Select placeholder="Chọn phường/xã" disabled={!selectedDistrict}>
//                 {wards?.map((ward: any) => (
//                   <Option key={ward.code} value={ward.code}>
//                     {ward.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </div>
//           <div className="">
//             <AddressMap />
//           </div>
//           <Form.Item>
//             <button type="submit">Lưu địa chỉ</button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

export const Update_Address = ({ addressId, setIsOpenUpdate }: any) => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const userRole = user?.user?.role;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const closeOpenUpdate = () => {
    setIsOpenUpdate(false);
  };

  // Lấy thông tin địa chỉ người dùng
  const { data, isSuccess } = useQuery({
    queryKey: ["AUTH_KEY", addressId],
    queryFn: async () => {
      const { data } = await instance.get(
        `/auth/address/${userId}/${addressId}`
      );
      return data;
    }
  });

  // Cập nhật giá trị của form khi dữ liệu đã được tải
  useEffect(() => {
    if (isSuccess && data?.address) {
      form.setFieldsValue(data.address);
    }
  }, [isSuccess, data, form]);

  // Mutation để cập nhật địa chỉ
  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      if (userRole === "courier") {
        const { data } = await instance.put(
          `/shippers/${userId}/${addressId}`,
          formData
        );

        return data;
      } else {
        const { data } = await instance.put(
          `/auth/${userId}/${addressId}`,
          formData
        );
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["AUTH_KEY", userId]
      });
      messageApi.open({
        type: "success",
        content: "Chỉnh sửa địa chỉ thành công"
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Chỉnh sửa địa chỉ thất bại!"
      });
    }
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
    mutate(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[500px]">
        <h1 className="py-3 font-medium text-center">Chỉnh sửa địa chỉ</h1>
        {contextHolder}
        <Form
          form={form}
          name="basic"
          // initialValues={{ ...data?.address }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="fullName"
            className="w-full my-3"
            rules={[
              { required: true, message: "Họ và Tên không được để trống!" }
            ]}
          >
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            className="w-full my-3"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ!"
              }
            ]}
          >
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Số điện thoại"
            />
          </Form.Item>

          <Form.Item
            name="address"
            className="w-full my-3"
            rules={[
              { required: true, message: "Địa chỉ không được để trống!" }
            ]}
          >
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
            />
          </Form.Item>

          <Form.Item name="addressDetails" className="w-full my-3">
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Địa chỉ cụ thể"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" className="h-10 text-white bg-black">
              Hoàn Thành
            </Button>
          </Form.Item>
        </Form>
        <Button
          onClick={closeOpenUpdate}
          className="absolute w-8 h-8 px-2 py-2 border-0 rounded hover:bg-slate-100 hover:rounded-full hover:border-2 top-5 right-5"
        >
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};

export const List_Address = ({
  auth,
  handleTAdd,
  handleAddressSelect,
  handleAddress,
  selectedAddress
}: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[600px] max-h-[600px] overflow-auto hidden_scroll_x">
        <h1 className="py-3 text-xl font-medium text-center">
          Địa chỉ của tôi
        </h1>
        <div>
          <div className="px-5 py-4">
            <div className="flex justify-between">
              <h2 className="py-2">Địa chỉ</h2>
              <Button className="w-9 h-9" onClick={handleTAdd}>
                <PlusOutlined />
              </Button>
            </div>

            {auth?.map((item: any, index: number) => (
              <div
                className="flex items-center justify-between pb-6 my-5 border-b"
                key={index}
              >
                <div className="flex items-start gap-4 py-1">
                  <div>
                    <h1>
                      <span className="font-bold">{item.fullName}</span>
                      <span className="px-2 text-gray-400">|</span>
                      <span className="text-gray-400">{item.phoneNumber}</span>
                    </h1>
                    <p className="py-2 text-gray-400">{item.addressDetails}</p>
                    <p className="text-gray-400">{item.address}</p>
                    <div className="flex gap-3 mt-3">
                      {item.checked && (
                        <Button className="py-5">Mặc định</Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="hidden lg:block">
                    <div className="flex flex-col gap-2 py-2 text-blue-400">
                      <Button className="w-9 h-9">
                        <EditOutlined />
                      </Button>
                      <Popconfirm
                        title="Địa chỉ nhận hàng"
                        description="Bạn có muốn chọn làm địa chỉ nhận hàng không?"
                        onConfirm={() => handleAddressSelect(item)}
                        okText="Có"
                        cancelText="Không"
                      >
                        {selectedAddress === item ? (
                          <Button
                            className="w-9 h-9 !bg-slate-100 cursor-not-allowed"
                            disabled
                          >
                            <CheckOutlined />
                          </Button>
                        ) : (
                          <Button className="w-9 h-9">
                            <CheckOutlined />
                          </Button>
                        )}
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
            ))}
          </div>
        </div>
        <Button
          onClick={handleAddress}
          className="absolute w-8 h-8 px-2 py-2 border-0 rounded hover:bg-slate-100 hover:rounded-full hover:border-2 top-5 right-5"
        >
          <CloseOutlined />
        </Button>
      </div>
    </div>
  );
};

const { Option } = Select;
interface IProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddress: () => void;
}
export const Add_Address = ({ isOpen, setIsOpen, handleAddress }: IProps) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    province: { code: null, name: "" },
    district: { code: null, name: "" },
    ward: { code: null, name: "" }
  });
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const userRole = user?.user?.role;
  const querryClient = useQueryClient();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      if (userRole === "courier") {
        const { data } = await instance.post(`/shippers/add_address`, formData);
        form.resetFields();
        return data;
      } else {
        const { data } = await instance.post(`/auth/add_address`, formData);
        form.resetFields();
        return data;
      }
    },
    onSuccess: () => {
      form.resetFields();
      querryClient.invalidateQueries({
        queryKey: ["AUTH_KEY"]
      });
      messageApi.open({
        type: "success",
        content: "Thêm địa chỉ thành công"
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Thêm địa chỉ thất bại!"
      });
    }
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch {
        message.error("Lỗi khi tải danh sách tỉnh/thành phố.");
      }
    };
    fetchProvinces();
  }, []);

  const fetchDetailProvinces = async (provinceCode: string) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=3`
      );
      const data = await response.json();
      setDistricts(data.districts || []);
    } catch {
      message.error("Lỗi khi tải danh sách quận/huyện.");
    }
  };
  const handleProvinceChange = (value: string) => {
    const selectedProvince = provinces.find((item) => item.code === value);
    if (selectedProvince) {
      setSelectedLocation({
        province: selectedProvince,
        district: { code: null, name: "" },
        ward: { code: null, name: "" }
      });
      setDistricts([]);
      setWards([]);
      fetchDetailProvinces(value);
    }
  };

  const handleDistrictChange = (value: string) => {
    const selectedDistrict = districts.find((item) => item.code === value);
    if (selectedDistrict) {
      setSelectedLocation((prev) => ({
        ...prev,
        district: selectedDistrict,
        ward: { code: null, name: "" }
      }));
      setWards(selectedDistrict.wards || []);
    }
  };

  const handleWardChange = (value: string) => {
    const selectedWard = wards.find((item) => item.code === value);
    if (selectedWard) {
      setSelectedLocation((prev) => ({
        ...prev,
        ward: selectedWard
      }));
      const fullAddress = `${selectedWard.name}, ${selectedLocation.district.name}, ${selectedLocation.province.name}`;
      fetchCoordinates(fullAddress);
    }
  };

  const fetchCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features?.length) {
        const [lng, lat] = data.features[0].center;
        setCoordinates({ lat, lng });
      } else {
        message.error("Không thể tìm thấy tọa độ.");
      }
    } catch {
      message.error("Lỗi khi tìm tọa độ.");
    }
  };

  const mapContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapContainerRef.current || !coordinates.lat || !coordinates.lng)
      return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      zoom: 12
    });

    map.on("click", (e) => {
      const newCoordinates = e.lngLat;
      setCoordinates({
        lat: newCoordinates.lat,
        lng: newCoordinates.lng
      });
      console.log(
        "Tọa độ mới sau khi click:",
        newCoordinates.lng,
        newCoordinates.lat
      );
    });

    return () => {
      map.remove();
    };
  }, [coordinates]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // Debug selectedLocation
    console.log("selectedLocation", selectedLocation);

    if (!selectedLocation.district?.code) {
      message.error("Vui lòng chọn quận/huyện!");
      return;
    }
    if (!selectedLocation.ward?.code) {
      message.error("Vui lòng chọn xã/phường!");
      return;
    }

    if (!coordinates.lat || !coordinates.lng) {
      const fullAddress = `${selectedLocation.ward.name}, ${selectedLocation.district.name}, ${selectedLocation.province.name}`;
      await fetchCoordinates(fullAddress);
    }

    const fullAddress = `${selectedLocation.ward.name}, ${selectedLocation.district.name}, ${selectedLocation.province.name}`;
    message.success("Địa chỉ đã được lưu!");
    const data_form: any = {
      userId: userId,
      newAddress: {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        detailedAddress: values.addressDetails,
        address: fullAddress,
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      },
      setDefault: values.checked
    };
    console.log("data_form", data_form);
    setIsOpen(false);
    mutate(data_form);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {contextHolder}
      <div className="bg-white p-4 border rounded relative w-[600px] lg:w-[600px] h-[400px] overflow-y-auto custom-scrollbar">
        <h1 className="py-1 font-medium text-center">Địa chỉ mới</h1>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="fullName"
            className="w-full my-3"
            label="Họ và tên"
            rules={[
              { required: true, message: "Vui lòng nhập họ và tên!" },
              { min: 3, message: "Tên phải có ít nhất 3 ký tự!" }
            ]}
            style={{ fontSize: "8px" }}
          >
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            className="w-full my-3"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ!"
              }
            ]}
          >
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="province"
              label="Tỉnh/Thành phố"
              rules={[
                { required: true, message: "Vui lòng chọn tỉnh/thành phố!" }
              ]}
              style={{ flex: 1 }}
            >
              <Select
                placeholder="Chọn tỉnh/thành phố"
                onChange={handleProvinceChange}
              >
                {provinces?.map((province: any) => (
                  <Option key={province.code} value={province.code}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="district"
              label="Quận/Huyện"
              rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
              style={{ flex: 1 }}
            >
              <Select
                placeholder="Chọn quận/huyện"
                onChange={handleDistrictChange}
                disabled={!districts.length}
              >
                {districts?.map((district: any) => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="ward"
              label="Xã/Phường"
              rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
              style={{ flex: 1 }}
            >
              <Select
                placeholder="Chọn xã/phường"
                onChange={handleWardChange}
                disabled={!wards.length}
              >
                {wards?.map((ward: any) => (
                  <Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name="addressDetails"
            className="w-full"
            label="Địa chỉ cụ thể"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ cụ thể!" }
            ]}
          >
            <Input
              className="w-full px-2 py-2 border rounded focus:ring-0"
              placeholder="Địa chỉ cụ thể"
            />
          </Form.Item>
          <div className="">
            <div
              ref={mapContainerRef}
              style={{
                width: "100%",
                height: "30vh"
              }}
            />
          </div>
          <Form.Item
            className="flex items-center w-full gap-3 mt-10"
            name="checked"
            valuePropName="checked"
          >
            <Checkbox>Đặt làm mặc định</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="h-10 text-white bg-black">
              Hoàn Thành
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
