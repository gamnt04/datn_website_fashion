import { SubmitHandler, useForm } from "react-hook-form";
import { createProduct } from "../../../../services/product";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Message from "../../../../components/base/Message/Message";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";
import { IProduct } from "../../../../common/interfaces/Product";

const AddProduct = () => {
  const { data } = useCategoryQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IProduct>();

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  imageSelected;
  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const { gallery, image, ...formData }: any = data;
      const uploadedImageUrls = image ? await uploadImage(image) : [];
      const uploadedGalleryUrls = gallery ? await uploadGallery(gallery) : [];

      const newData: IProduct = {
        ...formData,
        image: uploadedImageUrls[0], // Assuming only one main image is uploaded
        gallery: uploadedGalleryUrls,
      };

      await createProduct(newData);
      setSuccessMessage("Thêm Sản Phẩm thành công !");
      setShowMessage(true);
    } catch (error) {
      console.error("Thêm mới thất bại:", error);
      setErrorMessage("Thêm Sản Phẩm Lỗi !");
      setShowMessage(true);
    }
  };

  const uploadImage = async (file: FileList | null) => {
    if (!file) return [];

    const CLOUD_NAME = "dwya9mxip";
    const PRESET_NAME = "upImgProduct";
    const FOLDER_NAME = "PRODUCTS";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    try {
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return [response.data.secure_url];
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageSelected(true);
    } else {
      setImageSelected(false);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then((images) => {
        setGalleryPreview(images);
        setValue("gallery", images);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    setImageSelected(false);
    setValue("image", []);
  };

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
              Mô tả
            </label>
            <textarea
              placeholder="Mô tả"
              {...register("description", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.description?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="colors"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Màu sắc
            </label>
            <input
              type="color"
              placeholder="Màu sắc"
              {...register("colors")}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.colors?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="sizes"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Kích thước
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="S"
                  {...register("sizes")}
                  className="form-checkbox"
                />
                <span className="ml-2">S</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="M"
                  {...register("sizes")}
                  className="form-checkbox"
                />
                <span className="ml-2">M</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="L"
                  {...register("sizes")}
                  className="form-checkbox"
                />
                <span className="ml-2">L</span>
              </label>
            </div>
            <div className="text-xs italic text-red-500">
              {errors.sizes?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="countInStock"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Số lượng trong kho
            </label>
            <input
              type="number"
              placeholder="Số lượng trong kho"
              {...register("countInStock", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.countInStock?.message}
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Hình ảnh
              </label>
              <input
                type="file"
                id="product_image"
                {...register("image", {
                  required: "Vui lòng chọn ảnh sản phẩm",
                })}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="h-20 mt-2"
                  />
                  <button
                    type="button"
                    onClick={removeImagePreview}
                    className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
                  >
                    X
                  </button>
                </div>
              )}
              <div className="text-xs italic text-red-500">
                {errors.image?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="gallery"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Bộ sưu tập
              </label>
              <input
                type="file"
                id="product_gallery"
                multiple
                {...register("gallery")}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                onChange={handleGalleryChange}
                ref={galleryInputRef}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {galleryPreview.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Gallery Preview ${index + 1}`}
                      className="h-20"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
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
