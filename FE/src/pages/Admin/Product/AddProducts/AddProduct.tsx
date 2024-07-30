/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import Message from "../../../../components/base/Message/Message";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";
import { IAttribute, IProduct } from "../../../../common/interfaces/Product";
import { add_items_client } from "../../../../_lib/Items/Products";
import {
  uploadImage,
  uploadGallery,
} from "../../../../systems/utils/uploadImage";
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

const AddProduct = () => {
  const { data } = useCategoryQuery();
  const {
    register,
    handleSubmit,
    reset,
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
  const [attributesData, setAttributes] = useState<IAttribute[]>([
    { color: "", size: [{ name_size: "", stock_attribute: 0 }] },
  ]);
  imageSelected;
  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const { gallery_product, image_product, ...formData }: any = data;
      const uploadedImageUrls = image_product
        ? await uploadImage(image_product)
        : [];
      const uploadedGalleryUrls = gallery_product
        ? await uploadGallery(gallery_product)
        : [];
      const dataArrt = JSON.stringify(attributesData);
      const newData: IProduct = {
        ...formData,
        image_product: uploadedImageUrls[0],
        gallery_product: uploadedGalleryUrls,
        attributes: dataArrt,
      };
      const response = await add_items_client(newData);
      if (response.message === "OK") {
        setSuccessMessage("Thêm Sản Phẩm thành công !");
        setImagePreview(null);
        setGalleryPreview([]);
        setAttributes([]);
        reset();
      } else {
        setErrorMessage("Thêm mới thất bại!");
      }
      setShowMessage(true);
    } catch (error) {
      console.error("Thêm mới thất bại:", error);
      setErrorMessage("Thêm Sản Phẩm Lỗi !");
      setShowMessage(true);
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
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="name_product"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Tên sản phẩm
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name_product", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.name_product?.message}
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
              placeholder="Price"
              {...register("price_product", { required: "Không bỏ trống" })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.price_product?.message}
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
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Chọn danh mục --</option>
              {data?.map((category: ICategory) => (
                <option key={category._id} value={category._id}>
                  {category.name_category}
                </option>
              ))}
            </select>
            <div className="text-xs italic text-red-500">
              {errors.category_id?.message}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description_product"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Mô tả
            </label>
            <textarea
              placeholder="Mô tả"
              {...register("description_product", {
                required: "Không bỏ trống",
              })}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            <div className="text-xs italic text-red-500">
              {errors.description_product?.message}
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="image_product"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Hình ảnh
              </label>
              <input
                type="file"
                id="product_image"
                {...register("image_product", {
                  required: "Vui lòng chọn ảnh sản phẩm",
                })}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                onChange={(e) =>
                  handleImageChange(e, setImagePreview, setImageSelected)
                }
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
                    onClick={() =>
                      removeImagePreview(
                        setImagePreview,
                        setImageSelected,
                        setValue
                      )
                    }
                    className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
                  >
                    X
                  </button>
                </div>
              )}
              <div className="text-xs italic text-red-500">
                {errors.image_product?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="gallery_product"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Bộ sưu tập
              </label>
              <input
                type="file"
                id="product_gallery"
                multiple
                {...register("gallery_product")}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                onChange={(e) =>
                  handleGalleryChange(e, setGalleryPreview, setValue)
                }
                ref={galleryInputRef}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {galleryPreview.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt="Gallery Image Preview"
                      className="h-20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeGalleryImage(
                          index,
                          setGalleryPreview,
                          galleryInputRef
                        )
                      }
                      className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-xs italic text-red-500">
                {errors.gallery_product?.message}
              </div>
            </div>
          </div>

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
                    <div key={sizeIndex} className="flex mb-4">
                      <div>
                        <label
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
                        />
                      </div>
                      <div>
                        <label
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
                        />
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

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Thêm Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
