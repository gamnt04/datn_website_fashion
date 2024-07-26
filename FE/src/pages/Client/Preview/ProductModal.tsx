import React, { useState, useEffect } from "react";
import { IProduct } from "../../../common/interfaces/Product";

interface ProductModalProps {
  product: IProduct;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    console.log(product);
  }, [product]);

  if (!product) return null;

  const colors = product.attr?.values?.map((attr: any) => attr.color).filter((color: any) => color);
  const sizes = selectedColor
    ? product.attr?.values
        ?.filter((attr: any) => attr.color === selectedColor)
        .map((attr: any) => attr.size)
        .flat()
        .filter((size: any) => size)
    : [];

  const handleColorClick = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color);
    setSelectedSize(null); // Reset size selection when changing color
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 py-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-48 w-48 bg-gray-100 sm:mx-0 sm:h-32 sm:w-32 border-4 border-white shadow-lg overflow-hidden rounded-full">
                {typeof product.product.image_product === "string" && (
                  <img
                    src={product.product.image_product}
                    alt={product.product.name_product}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                  Thông tin sản phẩm
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    <b>Tên sản phẩm:</b> {product.product.name_product}
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>Giá:</b>{" "}
                    {product.product.price_product
                      ? product.product.price_product.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })
                      : ""}
                  </p>
                  {colors && colors.length > 0 && (
                    <div className="text-sm text-gray-700 mt-4">
                      <b>Màu sắc:</b>
                      <div className="flex mt-2 space-x-2">
                        {colors.map((color: any, index: number) => (
                          <div
                            key={index}
                            className={`h-8 w-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorClick(color)}
                          >
                            {selectedColor === color && (
                              <svg
                                className="text-white w-4 h-4 mx-auto mt-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedColor && sizes && sizes.length > 0 && (
                    <div className="text-sm text-gray-700 mt-4">
                      <b>Kích cỡ:</b>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {sizes.map((size: any, index: number) => (
                          <button
                            key={index}
                            className={`px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100 transition ${selectedSize === size.name_size ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300'}`}
                            onClick={() => handleSizeClick(size.name_size)}
                          >
                            <div className="flex justify-between items-center">
                              <span>{size.name_size}</span>
                              <span className="ml-2 text-xs text-gray-500">Kho: {size.stock_attribute}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-700 mt-4">
                    <b>Số lượng:</b>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 transition rounded-l-md"
                        onClick={decrementQuantity}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-gray-300 text-gray-700 bg-white">
                        {quantity}
                      </span>
                      <button
                        className="px-2 py-1 border border-gray-300 text-gray-700 hover:bg-gray-100 transition rounded-r-md"
                        onClick={incrementQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm transition-all"
              onClick={onClose}
            >
              Đóng
            </button>
            <button className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductModal);