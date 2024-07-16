/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/base/Loading/Loading";
import { remove_items_client } from "../../../_lib/Items/Products";
import { format } from "date-fns";
import { IProduct } from "../../../common/interfaces/Product";
import AddProduct from "./AddProducts/Index";
import { Query_Products } from "../../../common/hooks/Products/Products";

const ListProduct = () => {
  const { data, isLoading, refetch } = Query_Products(); // Sử dụng refetch để làm mới dữ liệu

  const navigate = useNavigate();
  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null
  );

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const handleRemove = async (id: string) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
      setRemovingProductId(id);
      try {
        // Gửi yêu cầu xóa sản phẩm
        await remove_items_client(id);
        alert("Xóa thành công");

        // Cập nhật lại danh sách sản phẩm sau khi xóa
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col mt-5">
          <div className="relative flex items-center justify-between mb-3">
            <h1 className="text-2xl font-medium">Danh sách sản phẩm</h1>
            <button
              onClick={handleTrash}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Thùng rác
            </button>
            <AddProduct />
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
                        Ngày chỉnh sửa
                      </th>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((product: IProduct, index: number) => (
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
                          {formatDate(product.updatedAt)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <button
                            onClick={() => handleUpdate(product._id!)}
                            className="p-3 mr-2 text-white bg-blue-500 border rounded-lg hover:bg-blue-400 focus:outline-none"
                          >
                            Cập nhật
                          </button>
                          <button
                            onClick={() => handleRemove(product._id!)}
                            className={`p-3 text-white border rounded-lg ${removingProductId === product._id
                              ? "bg-gray-500"
                              : "bg-rose-500 hover:bg-rose-400"
                              } focus:outline-none`}
                            disabled={removingProductId === product._id}
                          >
                            {removingProductId === product._id
                              ? "Đang xóa..."
                              : "Xóa"}
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
