import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../../../../components/base/Loading/Loading";
import { IProduct } from "../../../../common/interfaces/Product";
import {
  get_detail_items,
  edit_items_client,
} from "../../../../_lib/Items/Products";
import useCategoryQuery from "../../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../../common/interfaces/Category";

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const { register, handleSubmit, setValue } = useForm<IProduct>();
  const { data: categories } = useCategoryQuery();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("Thiếu tham số ID");
        return;
      }
      try {
        const fetchedProduct = await get_detail_items(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setValue("name_product", fetchedProduct.name_product);
          setValue("price_product", fetchedProduct.price_product);
          setValue("category_id", fetchedProduct.category_id);
          setValue("description_product", fetchedProduct.description_product);
          setValue("countInStock_product", fetchedProduct.countInStock_product);
          setValue("quantity_product", fetchedProduct.quantity_product);
          setValue("image_product", fetchedProduct.image_product);
          setValue("gallery_product", fetchedProduct.gallery_product);
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
        await edit_items_client(id, data);
        alert("Cap nhat done");
        console.log(data);
        setTimeout(() => navigate("/admin/products"), 2000);
      }
    } catch (error) {
      alert("Cập nhật thất bại");
      console.error("Error updating product:", error);
    }
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="mt-5">
      <h1 className="mb-5 text-2xl font-medium">Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name_product"
            className="block text-sm font-medium text-gray-700"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name_product"
            {...register("name_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price_product"
            className="block text-sm font-medium text-gray-700"
          >
            Giá sản phẩm
          </label>
          <input
            type="number"
            id="price_product"
            {...register("price_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="description_product"
            className="block text-sm font-medium text-gray-700"
          >
            Miêu tả sản phẩm
          </label>
          <textarea
            id="description_product"
            {...register("description_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="countInStock_product"
            className="block text-sm font-medium text-gray-700"
          >
            Số lượng trong kho
          </label>
          <input
            type="number"
            id="countInStock_product"
            {...register("countInStock_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity_product"
            className="block text-sm font-medium text-gray-700"
          >
            Số lượng
          </label>
          <input
            type="number"
            id="quantity_product"
            {...register("quantity_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image_product"
            className="block text-sm font-medium text-gray-700"
          >
            Link ảnh sản phẩm
          </label>
          <input
            type="text"
            id="image_product"
            {...register("image_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="gallery_product"
            className="block text-sm font-medium text-gray-700"
          >
            Gallery sản phẩm
          </label>
          <textarea
            id="gallery_product"
            {...register("gallery_product")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
