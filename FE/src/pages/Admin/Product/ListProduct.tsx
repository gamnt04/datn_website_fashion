/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/base/Loading/Loading";
import { remove_items_client } from "../../../_lib/Items/Products";
import { format } from "date-fns";
import { IProduct } from "../../../common/interfaces/Product";
import AddProduct from "./AddProducts/Index";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { Checkbox } from "@mui/material";

const ListProduct = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = Query_Products();
  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null
  );
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const handleRemove = async (id: string) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
      setRemovingProductId(id);
      try {
        await remove_items_client(id);
        alert("Xóa thành công");
        await refetch();
      } catch (error) {
        alert("Xóa thất bại");
        console.error("Lỗi khi xóa sản phẩm:", error);
      } finally {
        setRemovingProductId(null);
      }
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`edit/${id}`);
  };

  const handleTrash = () => {
    navigate("/admin/products/trash");
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col mt-5">
          <div className="relative flex items-center justify-between mb-3">
            <h1 className="text-2xl font-medium">Danh sách sản phẩm</h1>
            <AddProduct />
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full text-center divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        <Checkbox
                          checked={selectedProducts.length === data?.length}
                          onChange={() =>
                            setSelectedProducts(
                              selectedProducts.length === data?.length
                                ? []
                                : data?.map((product: IProduct) => product._id)
                            )
                          }
                        />
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        STT
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Ảnh sản phẩm
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Tên sản phẩm
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Giá sản phẩm
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Số lượng trong kho
                      </th>

                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Ngày tạo
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Ngày chỉnh sửa
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        Thao tác
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-black">
                        <button
                          className="text-black focus:outline-none group"
                          onClick={handleTrash}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-5 h-5 transition-colors duration-300 ease-in-out fill-current group-hover:text-green-800 "
                          >
                            <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                          </svg>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((product: IProduct, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <Checkbox
                            checked={selectedProducts.includes(product._id!)}
                            onChange={() => handleCheckboxChange(product._id!)}
                          />
                        </td>
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
                          {product.countInStock_product}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatDate(product.createdAt)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatDate(product.updatedAt)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <button
                            onClick={() => handleUpdate(product._id!)}
                            className="text-black rounded-lg focus:outline-none group"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 transition-colors duration-300 ease-in-out fill-current group-hover:text-blue-800"
                            >
                              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleRemove(product._id!)}
                            className={`p-3 text-white border rounded-lg ${
                              removingProductId === product._id
                                ? "bg-gray-500"
                                : "bg-rose-500 hover:bg-rose-400"
                            } focus:outline-none`}
                            disabled={removingProductId === product._id}
                          >
                            {removingProductId === product._id ? (
                              "Đang xóa..."
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-5 h-5 transition-colors duration-300 ease-in-out fill-current group-hover:text-red-800"
                              >
                                <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                              </svg>
                            )}
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
      )}
    </>
  );
};

export default ListProduct;
