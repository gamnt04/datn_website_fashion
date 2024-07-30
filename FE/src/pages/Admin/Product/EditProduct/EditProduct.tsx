import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../../../../components/base/Loading/Loading";
import { IAttribute, IProduct } from "../../../../common/interfaces/Product";
import {
  get_detail_items,
  edit_items_client,
} from "../../../../_lib/Items/Products";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";
import {
  uploadImage,
  uploadGallery,
} from "../../../../systems/utils/uploadImage";
import {
  handleImageChange,
  handleGalleryChange,
  removeImagePreview,
  removeGalleryImage,
  handleAddAttribute,
  handleAddSize,
  handleAttributeChange,
  handleRemoveAttribute,
  handleRemoveSize,
  handleSizeChange,
} from "../../../../systems/utils/eventAddPro";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../../configs/axios";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();
  const { data: categories } = useCategoryQuery();
  const { data: attr } = useQuery({
    queryKey: ["products", id],
    queryFn: () => instance.get(`products/${id}`),
  });
  console.log(`att`, attr?.data.product.attributes);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState(false);
  const [attributesData, setAttributes] = useState<IAttribute[]>([
    { color: "", size: [{ name_size: "", stock_attribute: 0 }] },
  ]);
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("Thiếu tham số ID");
        return;
      }
      try {
        const data = await get_detail_items(id);
        const fetchedProduct = data.product;
        console.log(`Products`, data);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setValue("name_product", fetchedProduct.name_product);
          setValue("price_product", fetchedProduct.price_product);
          setValue("category_id", fetchedProduct.category_id);
          setValue("description_product", fetchedProduct.description_product);
          //setValue("quantity_product", fetchedProduct.quantity_product);
          setValue("image_product", fetchedProduct.image_product);
          setValue("gallery_product", fetchedProduct.gallery_product);

          // Hiển thị ảnh cũ
          setImagePreview(fetchedProduct.image_product);
          setGalleryPreview(fetchedProduct.gallery_product);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data: IProduct) => {
    try {
      if (id) {
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
          image_product: uploadedImageUrls[0], // Assuming only one main image is uploaded
          gallery_product: uploadedGalleryUrls,
          attributes: dataArrt,
        };
        await edit_items_client(id, newData);
        alert("Cập nhật thành công");
        console.log(data);
        setTimeout(() => navigate("/admin/products"), 2000);
      }
    } catch (error) {
      alert("Cập nhật thất bại");
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-5 text-2xl font-medium">Cập nhật sản phẩm</h1>
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
            htmlFor="price_product"
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
            htmlFor="category_id"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Danh mục
          </label>
          <select
            {...register("category_id", { required: "Không bỏ trống" })}
            className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none text focus:outline-none focus:shadow-outline"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories?.map((category: ICategory) => (
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

        {/* <div className="mb-4">
          <label
            htmlFor="quantity_product"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Số lượng
          </label>
          <input
            type="number"
            placeholder="Số lượng "
            {...register("quantity_product", {
              required: "Không bỏ trống",
            })}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <div className="text-xs italic text-red-500">
            {errors.quantity_product?.message}
          </div>
        </div> */}

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
                  <img src={url} alt="Gallery Image Preview" className="h-20" />
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
            {attr?.data.product.attributes.values.map((attribute, index) => (
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
                    handleRemoveAttribute(index, attributesData, setAttributes)
                  }
                  className="px-3 py-2 text-white bg-red-500 rounded "
                >
                  Xóa Thuộc Tính
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddAttribute(attributesData, setAttributes)}
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Thêm Thuộc Tính
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
