import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../../common/interfaces/Product";
import Loading from "../../../../components/base/Loading/Loading";
import { updateProduct, getProductById } from "../../../../services/product";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Message from "../../../../components/base/Message/Message";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";
import { useForm } from "react-hook-form";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<string[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories } = useCategoryQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
          setSelectedImage(data.image);
          setSelectedGallery(data.gallery);

          // Set form values when product is loaded
          setValue("name", data.name);
          setValue("price", data.price);
          setValue("category_id", data.category_id);
          setValue("description", data.description);
          setValue("colors", data.colors);
          setValue("sizes", data.sizes);
          setValue("countInStock", data.countInStock);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const handleUpdate = async (updatedProduct: IProduct) => {
    try {
      if (id) {
        await updateProduct(id, updatedProduct);
        setSuccessMessage("Cập nhật thành công");
        setShowMessage(true);
        queryClient.invalidateQueries("products");
        setTimeout(() => navigate("/admin/products"), 2000);
      }
    } catch (error) {
      setErrorMessage("Cập nhật thất bại");
      setShowMessage(true);
      console.error("Error updating product:", error);
    }
  };

  const uploadImage = async (file: FileList | null) => {
    if (!file) return selectedImage;

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
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const uploadGallery = async (files: FileList | null) => {
    if (!files) return selectedGallery;

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

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setValue("image", []);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setSelectedGallery((prevGallery) =>
      prevGallery.filter((_, i) => i !== index)
    );
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
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
      <h1 className="my-10 text-4xl font-bold text-center">
        Cập nhật sản phẩm
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(async (formData) => {
            const { gallery, image, ...restData } = formData;
            const uploadedImageUrls =
              image instanceof FileList && image.length > 0
                ? await uploadImage(image)
                : selectedImage;
            const uploadedGalleryUrls =
              gallery instanceof FileList && gallery.length > 0
                ? await uploadGallery(gallery)
                : selectedGallery;

            const updatedProduct: IProduct = {
              ...restData,
              image: uploadedImageUrls,
              gallery: uploadedGalleryUrls,
            };
            handleUpdate(updatedProduct);
          })}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Tên sản phẩm
            </label>
            <input
              type="text"
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
              Giá sản phẩm
            </label>
            <input
              type="number"
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
              {categories?.map((category: ICategory) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="text-xs italic text-red-500">
              {errors.category_id?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Mô tả
            </label>
            <textarea
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
              {selectedImage && (
                <div className="relative inline-block">
                  <img
                    src={selectedImage}
                    alt="Ảnh sản phẩm"
                    className="h-32 mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
                  >
                    x
                  </button>
                </div>
              )}
              <input
                type="file"
                {...register("image", {
                  required: "Vui lòng chọn ảnh sản phẩm",
                })}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
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
                Bộ sưu tập
              </label>
              {selectedGallery.map((url, index) => (
                <div key={index} className="relative inline-block">
                  <img src={url} alt="Gallery" className="h-32 mb-2" />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
                  >
                    x
                  </button>
                </div>
              ))}
              <input
                type="file"
                multiple
                {...register("gallery")}
                onChange={(e) => {
                  if (e.target.files) {
                    const galleryUrls = Array.from(e.target.files).map((file) =>
                      URL.createObjectURL(file)
                    );
                    setSelectedGallery(galleryUrls);
                  }
                }}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                ref={galleryInputRef}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
