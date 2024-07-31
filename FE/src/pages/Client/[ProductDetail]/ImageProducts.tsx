import React, { useState } from "react";
import { IProduct } from "../../../common/interfaces/Product";
import { Carousel, Image } from "antd";

interface ImageProductProp {
  product: IProduct;
}

const ImageProducts: React.FC<ImageProductProp> = ({ product }) => {
  const { image_product, gallery_product } = product;
  const [currentImage, setCurrentImage] = useState(image_product);
  const chunkArray = (array: any, size: any) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunks = chunkArray(gallery_product, 3);
  return (
    <div className="w-full h-full lg:mt-0 mt-4">
      <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
        <div className="relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white overflow-hidden grid place-items-center rounded-xl">
          <Image
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
        <div className=" w-[45%]">
          {gallery_product && gallery_product.length > 0 ? (
            <Carousel arrows draggable className="flex justify-center">
              {chunks.map((chunk, index) => (
                <div key={index} className="flex justify-center">
                  {chunk.map((item: any, subIndex: any) => (
                    <button
                      key={subIndex}
                      className="hover:scale-110"
                      onClick={() => setCurrentImage(item)}
                    >
                      <img
                        src={item}
                        alt={`Gallery ${subIndex}`}
                        className="w-[70px] h-[70px]object-cover mx-2"
                      />
                    </button>
                  ))}
                </div>
              ))}
            </Carousel>
          ) : (
            <div>
              <h3>No images to display</h3>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ImageProducts;
