// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useEffect, useState, useRef } from "react";
// import Message from "../../../../components/base/Message/Message";
// import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
// import { ICategory } from "../../../../common/interfaces/Category";
// import { IAttribute, IProduct } from "../../../../common/interfaces/Product";
// import { add_items_client } from "../../../../_lib/Items/Products";
// import {
//   uploadImage,
//   uploadGallery,
// } from "../../../../systems/utils/uploadImage";
// import {
//   handleImageChange,
//   handleGalleryChange,
//   removeImagePreview,
//   removeGalleryImage,
//   handleAttributeChange,
//   handleSizeChange,
//   handleAddAttribute,
//   handleAddSize,
//   handleRemoveAttribute,
//   handleRemoveSize,
// } from "../../../../systems/utils/eventAddPro";

// const AddProduct = () => {
//   const { data } = useCategoryQuery();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm<IProduct>();

//   const [showMessage, setShowMessage] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
//   const [imageSelected, setImageSelected] = useState(false);
//   const galleryInputRef = useRef<HTMLInputElement>(null);
//   const [attributesData, setAttributes] = useState<IAttribute[]>([
//     { color: "", size: [{ name_size: "", stock_attribute: 0 }] },
//   ]);
//   imageSelected;
//   const onSubmit: SubmitHandler<IProduct> = async (data) => {
//     try {
//       const { gallery_product, image_product, ...formData }: any = data;
//       const uploadedImageUrls = image_product
//         ? await uploadImage(image_product)
//         : [];
//       const uploadedGalleryUrls = gallery_product
//         ? await uploadGallery(gallery_product)
//         : [];
//       const dataArrt = JSON.stringify(attributesData);
//       const newData: IProduct = {
//         ...formData,
//         image_product: uploadedImageUrls[0],
//         gallery_product: uploadedGalleryUrls,
//         attributes: dataArrt,
//       };
//       const response = await add_items_client(newData);
//       if (response.message === "OK") {
//         console.log(newData);
//         setSuccessMessage("Thêm Sản Phẩm thành công !");
//         setImagePreview(null);
//         setGalleryPreview([]);
//         setAttributes([]);
//         reset();
//       } else {
//         setErrorMessage("Thêm mới thất bại!");
//       }
//       setShowMessage(true);
//     } catch (error) {
//       console.error("Thêm mới thất bại:", error);
//       setErrorMessage("Thêm Sản Phẩm Lỗi !");
//       setShowMessage(true);
//     }
//   };

//   useEffect(() => {
//     if (showMessage) {
//       const timer = setTimeout(() => {
//         setShowMessage(false);
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showMessage]);
//   return (
//     <div className="container mx-auto">
//       {successMessage && (
//         <Message
//           message={successMessage}
//           timeout={2000}
//           openMessage={showMessage}
//           type={"success"}
//         />
//       )}
//       {errorMessage && (
//         <Message
//           message={errorMessage}
//           timeout={2000}
//           openMessage={showMessage}
//           type={"warning"}
//         />
//       )}
//       <div>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="name_product"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Tên sản phẩm
//             </label>
//             <input
//               type="text"
//               placeholder="Name"
//               {...register("name_product", { required: "Không bỏ trống" })}
//               className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//             />
//             <div className="text-xs italic text-red-500">
//               {errors.name_product?.message}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="price"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Giá sản phẩm
//             </label>
//             <input
//               type="number"
//               placeholder="Price"
//               {...register("price_product", { required: "Không bỏ trống" })}
//               className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//             />
//             <div className="text-xs italic text-red-500">
//               {errors.price_product?.message}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="slug"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Danh mục
//             </label>
//             <select
//               {...register("category_id", { required: "Không bỏ trống" })}
//               className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text focus:outline-none focus:shadow-outline"
//             >
//               <option value="">-- Chọn danh mục --</option>
//               {data?.map((category: ICategory) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name_category}
//                 </option>
//               ))}
//             </select>
//             <div className="text-xs italic text-red-500">
//               {errors.category_id?.message}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description_product"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               Mô tả
//             </label>
//             <textarea
//               placeholder="Mô tả"
//               {...register("description_product", {
//                 required: "Không bỏ trống",
//               })}
//               className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//             />
//             <div className="text-xs italic text-red-500">
//               {errors.description_product?.message}
//             </div>
//           </div>
//           <div className="mb-4">
//             <div className="mb-4">
//               <label
//                 htmlFor="image_product"
//                 className="block mb-2 text-sm font-bold text-gray-700"
//               >
//                 Hình ảnh
//               </label>
//               <input
//                 type="file"
//                 id="product_image"
//                 {...register("image_product", {
//                   required: "Vui lòng chọn ảnh sản phẩm",
//                 })}
//                 className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                 onChange={(e) =>
//                   handleImageChange(e, setImagePreview, setImageSelected)
//                 }
//               />
//               {imagePreview && (
//                 <div className="relative">
//                   <img
//                     src={imagePreview}
//                     alt="Image Preview"
//                     className="h-20 mt-2"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       removeImagePreview(
//                         setImagePreview,
//                         setImageSelected,
//                         setValue
//                       )
//                     }
//                     className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
//                   >
//                     X
//                   </button>
//                 </div>
//               )}
//               <div className="text-xs italic text-red-500">
//                 {errors.image_product?.message}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="gallery_product"
//                 className="block mb-2 text-sm font-bold text-gray-700"
//               >
//                 Bộ sưu tập
//               </label>
//               <input
//                 type="file"
//                 id="product_gallery"
//                 multiple
//                 {...register("gallery_product")}
//                 className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                 onChange={(e) =>
//                   handleGalleryChange(e, setGalleryPreview, setValue)
//                 }
//                 ref={galleryInputRef}
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {galleryPreview.map((url, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={url}
//                       alt="Gallery Image Preview"
//                       className="h-20"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         removeGalleryImage(
//                           index,
//                           setGalleryPreview,
//                           galleryInputRef
//                         )
//                       }
//                       className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-xs italic text-red-500">
//                 {errors.gallery_product?.message}
//               </div>
//             </div>
//           </div>

//           <div>
//             <div className="mb-4">
//               {attributesData.map((attribute, index) => (
//                 <div key={index} className="mb-4 ">
//                   <div className="mb-4">
//                     <label
//                       htmlFor={`color-${index}`}
//                       className="block mb-2 text-sm font-bold text-gray-700"
//                     >
//                       Màu Sắc
//                     </label>
//                     <input
//                       type="text"
//                       id={`color-${index}`}
//                       value={attribute.color}
//                       onChange={(e) =>
//                         handleAttributeChange(
//                           index,
//                           e,
//                           attributesData,
//                           setAttributes
//                         )
//                       }
//                       name="color"
//                       className="w-full px-3 py-2 border rounded"
//                     />
//                   </div>

//                   {attribute.size.map((size, sizeIndex) => (
//                     <div key={sizeIndex} className="flex mb-4">
//                       <div>
//                         <label
//                           htmlFor={`size-${index}-${sizeIndex}`}
//                           className="block mb-2 text-sm font-bold text-gray-700"
//                         >
//                           Kích Thước
//                         </label>
//                         <input
//                           type="text"
//                           id={`size-${index}-${sizeIndex}`}
//                           value={size.name_size}
//                           onChange={(e) =>
//                             handleSizeChange(
//                               index,
//                               sizeIndex,
//                               e,
//                               attributesData,
//                               setAttributes
//                             )
//                           }
//                           name="name_size"
//                           className="w-[410px] px-3 py-2 border rounded"
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor={`stock-${index}-${sizeIndex}`}
//                           className="block mb-2 ml-3 text-sm font-bold text-gray-700"
//                         >
//                           Số lượng
//                         </label>
//                         <input
//                           type="number"
//                           id={`stock-${index}-${sizeIndex}`}
//                           value={size.stock_attribute}
//                           onChange={(e) =>
//                             handleSizeChange(
//                               index,
//                               sizeIndex,
//                               e,
//                               attributesData,
//                               setAttributes
//                             )
//                           }
//                           name="stock_attribute"
//                           className="w-[410px] px-3 py-2 mx-3 border rounded"
//                         />
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleRemoveSize(
//                               index,
//                               sizeIndex,
//                               attributesData,
//                               setAttributes
//                             )
//                           }
//                           className="px-3 py-2 text-white bg-red-500 rounded "
//                         >
//                           Xóa Kích Thước
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() =>
//                       handleAddSize(index, attributesData, setAttributes)
//                     }
//                     className="px-4 py-2 mb-2 text-white bg-blue-500 rounded"
//                   >
//                     Thêm Kích Thước
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       handleRemoveAttribute(
//                         index,
//                         attributesData,
//                         setAttributes
//                       )
//                     }
//                     className="px-3 py-2 text-white bg-red-500 rounded "
//                   >
//                     Xóa Thuộc Tính
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() =>
//                   handleAddAttribute(attributesData, setAttributes)
//                 }
//                 className="px-4 py-2 text-white bg-green-500 rounded"
//               >
//                 Thêm Thuộc Tính
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
//             >
//               Thêm Sản Phẩm
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


import { Button, Checkbox, Flex, FormProps, Input, InputNumber, message, Upload } from "antd";
import { AiFillBackward } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SubmitHandler, useForm } from "react-hook-form";
import instance from "@/configs/axios";
import { useState } from "react";
import {
  handleImageChange,
  handleGalleryChange,
  removeImagePreview,
  removeGalleryImage,
  handleAttributeChange,
  handleSizeChange,
  handleAddAttribute,
  handleAddSize,
  handleRemoveAttribute,
  handleRemoveSize,
} from "../../../../systems/utils/eventAddPro";

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
type FieldType = {
  name_product: string;
  price: number;
  image_product: string,
  description_product: string;
  featured: boolean;
  countInStock: number;
  discount: number;
  category: string[];
};
const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [attributesData, setAttributes] = useState<IAttribute[]>([
    { color: "", size: [{ name_size: "", stock_attribute: 0 }] },
  ]);
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="container mx-auto">
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl">Thêm sản phẩm</h1>
        <Link to="/admin/products">
          <Button type="primary">
            <AiFillBackward /> Quay lại
          </Button>
        </Link>
      </div>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-[auto,300px] gap-8">
          <div>
            <Form.Item<FieldType>
              label="Tên sản phẩm"
              name='name_product'
              rules={[{ required: true, message: "Tên sản phẩm bắt buộc nhập!" }]}
            >
              <Input />
            </Form.Item>


            <div className="flex w-1/2 justify-between items-start">
              <Form.Item<FieldType>
                label="Ảnh sản phẩm"
                name='image_product'
                rules={[{ required: true, message: "Ảnh sản phẩm là bắt buộc!" }]}
              >
                <Flex gap="middle" className="mb-4" wrap>
                  <Upload
                    name="image_product"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Flex>
              </Form.Item>

              <Form.Item<FieldType>
                label="Bộ sưu tập"
                name='image_product'
                className="flex items-center"
                rules={[{ required: true, message: "Ảnh sản phẩm là bắt buộc!" }]}
              >
                <Flex gap="middle" className="mb-4" wrap>
                  <Upload
                    name="image_product"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Flex>
              </Form.Item>
            </div>
            {/* <Form.Item<FieldType>
              label="Giá sản phẩm"
              name="price"
              rules={[
                { required: true, message: "Giá sản phẩm bắt buộc nhập!" },
                {
                  type: "number",
                  min: 0,
                  message: "Giá sản phẩm phải lớn hơn 0",
                },
              ]}
            >
              <InputNumber />
            </Form.Item> */}
            <Form.Item<FieldType> label="Mô tả sản phẩm" name="description_product">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item<FieldType> name="featured" valuePropName="checked">
              <Checkbox>Sản phẩm nổi bật</Checkbox>
            </Form.Item>
            <Form.Item<FieldType>
              label="Sản phẩm trong kho"
              name="countInStock"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Số lượng sản phẩm phải lớn hơn 0",
                },
              ]}
            >
              <InputNumber defaultValue={0} />
            </Form.Item>
            <div>
              <div className="mb-4">
                {attributesData.map((attribute, index) => (
                  <div key={index} className="mb-4 ">
                    <div className="mb-4">
                      <label
                        htmlFor={`color-${index}`}
                        className="block mb-2 text-sm font-bold text-gray-700"
                      >
                        Màu Sắc
                      </label>
                      <input
                        type="text"
                        id={`color-${index}`}
                        value={attribute.color}
                        onChange={(e) =>
                          handleAttributeChange(
                            index,
                            e,
                            attributesData,
                            setAttributes
                          )
                        }
                        name="color"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    {attribute.size.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="flex mb-4 gap-x-4">
                        <div>
                          {/* <label
                            htmlFor={`size-${index}-${sizeIndex}`}
                            className="block mb-2 text-sm font-bold text-gray-700"
                          >
                            Kích Thước
                          </label>
                          <input
                            type="text"
                            id={`size-${index}-${sizeIndex}`}
                            value={size.name_size}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sizeIndex,
                                e,
                                attributesData,
                                setAttributes
                              )
                            }
                            name="name_size"
                            className="w-[410px] px-3 py-2 border rounded"
                          /> */}
                           <Form.Item<FieldType>
                            label=" Kích Thước"
                            className="name_size"
                            rules={[
                              { required: true, message: "Giá sản phẩm bắt buộc nhập!" },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm phải lớn hơn 0",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="flex items-center gap-x-4">
                          {/* <label
                            htmlFor={`stock-${index}-${sizeIndex}`}
                            className="block mb-2 ml-3 text-sm font-bold text-gray-700"
                          >
                            Số lượng
                          </label>
                          <input
                            type="number"
                            id={`stock-${index}-${sizeIndex}`}
                            value={size.stock_attribute}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sizeIndex,
                                e,
                                attributesData,
                                setAttributes
                              )
                            }
                            name="stock_attribute"
                            className="w-[410px] px-3 py-2 mx-3 border rounded"
                          /> */}
                           <Form.Item<FieldType>
                            label="Số lượng"
                            name="stock_attribute"
                            rules={[
                              { required: true, message: "Giá sản phẩm bắt buộc nhập!" },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm phải lớn hơn 0",
                              },
                            ]}
                          >
                            <InputNumber />
                          </Form.Item>
                           <Form.Item<FieldType>
                            label="Giá sản phẩm"
                            name="price"
                            rules={[
                              { required: true, message: "Giá sản phẩm bắt buộc nhập!" },
                              {
                                type: "number",
                                min: 0,
                                message: "Giá sản phẩm phải lớn hơn 0",
                              },
                            ]}
                          >
                            <InputNumber />
                          </Form.Item>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSize(
                                index,
                                sizeIndex,
                                attributesData,
                                setAttributes
                              )
                            }
                            className="px-3 py-2 text-white bg-red-500 rounded "
                          >
                            Xóa Kích Thước
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddSize(index, attributesData, setAttributes)
                      }
                      className="px-4 py-2 mb-2 text-white bg-blue-500 rounded"
                    >
                      Thêm Kích Thước
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveAttribute(
                          index,
                          attributesData,
                          setAttributes
                        )
                      }
                      className="px-3 py-2 text-white bg-red-500 rounded "
                    >
                      Xóa Thuộc Tính
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handleAddAttribute(attributesData, setAttributes)
                  }
                  className="px-4 py-2 text-white bg-green-500 rounded"
                >
                  Thêm Thuộc Tính
                </button>
              </div>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Danh mục sản phẩm" name="category">
              <Checkbox.Group>
                {/* {categories?.data.map((category: any) => (
                  <Checkbox key={category._id} value={category._id}>
                    {category.name}
                  </Checkbox>
                ))} */}
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;