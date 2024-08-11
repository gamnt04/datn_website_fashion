import { Button } from "antd";
import { useTop10ProductBestSale } from "../../../../common/hooks/Order/querry_Order";

const TableTopProducts = () => {
  const {
    data: top10ProductBestSale,
    isLoading,
    error
  } = useTop10ProductBestSale();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <div className="flex flex-col w-full">
        <div className="flex space-x-6 mx-auto rounded-sm text-[#64748B] bg-[#F7F9FC] dark:bg-meta-4 sm:grid-cols-5">
          <div className=" xl:p-5">
            <h5 className="text-[16px] font-medium uppercase xsm:text-base">
              Top
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-[16px] font-medium uppercase xsm:text-base">
              Ảnh Sản Phẩm
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-[16px] font-medium uppercase xsm:text-base">
              Tên Sản Phẩm
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-[16px] font-medium uppercase xsm:text-base">
              Giá Sản Phẩm
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-[16px] font-medium uppercase xsm:text-base">
              Lượt Bán
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-[16px] font-medium uppercase xsm:text-base">
              Thao Tác
            </h5>
          </div>
        </div>

        {top10ProductBestSale.map((product, index) => (
          <div
            className={`flex items-start space-x-6 sm:grid-cols-5 ${
              index === top10ProductBestSale.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={product.productId}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <span>{index + 1}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img
                  src={product?.productId?.image_product}
                  alt={product?.productId?.name_product}
                  className="w-[48px] h-[48px] rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {product?.productId?.name_product}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">
                {formatCurrency(product.price_item)}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{product.quantity}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Button>View</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTopProducts;
