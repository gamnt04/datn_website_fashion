/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  getDeletedProducts,
  deleteProduct,
  restoreProduct,
} from "../../../_lib/Items/Products";
import { IProduct } from "../../../common/interfaces/Product";

const TrashProduct = () => {
  const [deletedProducts, setDeletedProducts] = useState([]);
  const navigate = useNavigate();
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };
  useEffect(() => {
    fetchDeletedProducts();
  }, []);

  const fetchDeletedProducts = async () => {
    try {
      const products = await getDeletedProducts();
      setDeletedProducts(products);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm đã xóa mềm:", error);
    }
  };

  const handleDeletePermanently = async (id: any) => {
    try {
      await deleteProduct(id);
      fetchDeletedProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm vĩnh viễn:", error);
    }
  };

  const handleRestore = async (id: any) => {
    try {
      await restoreProduct(id);
      fetchDeletedProducts(); // Refresh the list after restoration
    } catch (error) {
      console.error("Lỗi khi khôi phục sản phẩm:", error);
    }
  };
  const handleAdPro = () => {
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="relative flex items-center justify-between mb-3">
          <h1 className="text-2xl font-medium">Thùng rác</h1>
          <button
            onClick={handleAdPro}
            className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            Quản lý sản phẩm
          </button>
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      STT
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Ảnh sản phẩm
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Tên sản phẩm
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Giá sản phẩm
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Miêu tả
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Ngày tạo
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Ngày xóa
                    </th>
                    <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deletedProducts?.map((product: IProduct, index: number) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <img
                          src={product.image_product}
                          alt={product.name_product}
                          className="object-cover w-20 h-20 border rounded-md"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {product.name_product}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {product.price_product}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {product.description_product}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatDate(product.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatDate(product.deletedAt)}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => handleRestore(product._id)}
                          className="p-3 mr-2 text-white bg-blue-500 border rounded-lg hover:bg-blue-400 focus:outline-none"
                        >
                          Khôi phục
                        </button>
                        <button
                          onClick={() => handleDeletePermanently(product._id)}
                          className="p-3 text-white border rounded-lg bg-rose-500 hover:bg-rose-400"
                          focus:outline-none
                        >
                          Xóa vĩnh viễn
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrashProduct;
