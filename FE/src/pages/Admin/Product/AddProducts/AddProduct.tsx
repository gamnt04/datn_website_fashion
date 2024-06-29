// components/AddProduct/AddProduct.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { createProduct } from "../../../../services/product";
import axios from "axios";
import { IProduct } from "../../../../common/interfaces/Product";
import { useEffect, useState } from "react";
import Message from "../../../../components/base/Message/Message";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";

const AddProduct = () => {
  const { data } = useCategoryQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();
  // const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const { gallery, image, ...formData }: any = data; // Lấy gallery và image ra khỏi formData
      const uploadedImageUrls = await uploadImage(image); // Upload ảnh chính (image)
      const uploadedGalleryUrls = await uploadGallery(gallery); // Upload ảnh trong gallery

      const newData: IProduct = {
        ...formData,
        image: uploadedImageUrls[0], // Giả sử chỉ có một ảnh chính được upload
        gallery: uploadedGalleryUrls,
      };

      await createProduct(newData);
      setSuccessMessage("Thêm Sản Phẩm thành công !");
      setShowMessage(true);
    } catch (error) {
      console.error("Thêm mới thất bại:", error);
      setErrorMessage("Thêm Sản Phẩm Lỗi !");
      setShowMessage(true);
      console.log(error);
    }
  };

  const uploadImage = async (file: FileList | null) => {
    if (!file) return [];

    const CLOUD_NAME = "dwya9mxip";
    const PRESET_NAME = "upImgProduct";
    const FOLDER_NAME = "PRODUCTS";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file[0]); // Chỉ lấy file đầu tiên nếu có nhiều file được chọn
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return [response.data.secure_url]; // Trả về mảng đường dẫn (ở đây chỉ có một đường dẫn)
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const uploadGallery = async (files: FileList | null) => {
    if (!files) return [];

    const CLOUD_NAME = "dwya9mxip";
    const PRESET_NAME = "upImgProduct";
    const FOLDER_NAME = "PRODUCTS";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);

      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.secure_url;
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="container mx-auto">
      {successMessage && (
        <Message
          message={successMessage}
          timeout={2000}
          openMessage={showMessage}
          type={"success"}
        />
      )}
      {errorMessage && (
        <Message
          message={errorMessage}
          timeout={2000}
          openMessage={showMessage}
          type={"warning"}
        />
      )}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.name?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.price?.message}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Danh mục
            </label>
            <select
              {...register("category_id", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Chọn danh mục --</option>
              {data?.map((category: ICategory) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Description
            </label>
            <textarea
              placeholder="Description"
              {...register("description", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.description?.message}
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="product_image"
                {...register("image", {
                  required: "Vui lòng chọn ảnh sản phẩm",
                })}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <div className="text-xs italic text-red-500">
                {errors.image?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="gallery"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Gallery
              </label>
              <input
                type="file"
                id="product_gallery"
                multiple
                {...register("gallery")}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <div className="text-xs italic text-red-500">
                {errors.gallery?.message}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
