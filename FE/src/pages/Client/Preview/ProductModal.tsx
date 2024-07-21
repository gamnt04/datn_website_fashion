import React from "react"; // Thay thế bằng đường dẫn thực tế đến interface Product
import { IProduct } from "../../../common/interfaces/Product";

interface ProductModalProps {
  product: IProduct;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>
        <div className="bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-48 w-48 bg-blue-100 sm:mx-0 sm:h-32 sm:w-32 mt-10 shadow-lg overflow-hidden border-4 border-white">
                {typeof product.image_product === "string" && (
                  <img
                    src={product.image_product}
                    alt={product.name_product}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Thông tin sản phẩm
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    <b>Tên sản phẩm:</b> {product.name_product}
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>Giá:</b>{" "}
                    {product.price_product
                      ? product.price_product.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all"
              onClick={onClose}
            >
              Đóng
            </button>
            <button className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;