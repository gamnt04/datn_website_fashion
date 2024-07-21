import React, { useState } from "react";
import { IProduct } from "../../../common/interfaces/Product";
import { set } from "lodash";

interface ImageProductProp {
  product: IProduct;
}

const ImageProducts: React.FC<ImageProductProp> = ({ product }) => {
  const { image_product, gallery_product } = product;
  const [currentImage, setCurrentImage] = useState(image_product);

  return (
    <div className="w-full h-full lg:mt-0 mt-4">
      <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
        <div className="relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white overflow-hidden grid place-items-center rounded-xl">
          <img
            src={currentImage}
            alt="Product"
            className="w-full h-full rounded"
          />
          <div className="absolute bottom-0 cursor-pointer hover:scale-110 duration-300 right-0 -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 mb:w-8 mb:h-8 lg:p-2.5 mb:p-2 rounded-[50%] bg-white grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-external-link"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="hover:scale-110"
            onClick={() => setCurrentImage(image_product)}
          >
            <img
              src={image_product}
              className="w-16 h-16 bg-gray-100 p-2 rounded-lg"
            />
          </button>

          {gallery_product && gallery_product.length > 0 ? (
            gallery_product.map((gallery, index) => (
              <button
                key={index}
                className="hover:scale-110"
                onClick={() => setCurrentImage(gallery)}
              >
                <img
                  src={gallery}
                  alt={`Gallery ${index}`}
                  className="w-16 h-16 bg-gray-100 p-2 rounded-lg"
                />
              </button>
            ))
          ) : (
            <p>No gallery images available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageProducts;
