import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import {
  Query_Orders,
  useOrdersOfDay
} from "../../../common/hooks/Order/querry_Order";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { IOrder } from "../../../common/interfaces/Orders";
import CardDataStats from "./components/CardDataStats";
import ChartRevenueStatistcs from "./components/ChartRevenueStatistics";
import ChartRevenueWeekly from "./components/ChartRevenueWeekly";
import ChartUser from "./components/ChartUser";
import TableOrder from "./components/TableOrder";
import TableTopProducts from "./components/TableTopProducts";

const MainContent = () => {
  const { data: userData } = List_Auth("");
  const { data: productData } = Query_Products();
  const { data: orderOfDayData } = useOrdersOfDay();
  // const { data: orderData } = Query_Orders();
  console.log(orderOfDayData);

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };
  const totalPriceOrderDay = orderOfDayData?.reduce(
    (sum: number, order: IOrder) => {
      return sum + order.totalPrice;
    },
    0
  );

  return (
    <>
      {" "}
      <div className=" lg:mx-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4 2xl:gap-7.5 lg:mt-24">
          <CardDataStats
            title="Doanh Thu Hôm Nay"
            total={formatCurrency(totalPriceOrderDay)}
            rate="0.43%"
            levelUp
          >
            <div className="bg-[#EFF2F7] rounded-full flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3C50E0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-wallet-cards m-3 "
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
                <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
              </svg>
            </div>
          </CardDataStats>
          <CardDataStats
            title="Số Lượng Đơn Hàng"
            total={orderOfDayData?.length}
            rate="0.43%"
            levelUp
          >
            <div className="fill-[#3C50E0]  bg-[#EFF2F7] rounded-full flex justify-between items-center">
              <svg
                className="fill-primary dark:fill-white m-3 items-start"
                width="28"
                height="28"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7531 16.4312C10.3781 16.4312 9.27808 17.5312 9.27808 18.9062C9.27808 20.2812 10.3781 21.3812 11.7531 21.3812C13.1281 21.3812 14.2281 20.2812 14.2281 18.9062C14.2281 17.5656 13.0937 16.4312 11.7531 16.4312ZM11.7531 19.8687C11.2375 19.8687 10.825 19.4562 10.825 18.9406C10.825 18.425 11.2375 18.0125 11.7531 18.0125C12.2687 18.0125 12.6812 18.425 12.6812 18.9406C12.6812 19.4219 12.2343 19.8687 11.7531 19.8687Z"
                  fill=""
                />
                <path
                  d="M5.22183 16.4312C3.84683 16.4312 2.74683 17.5312 2.74683 18.9062C2.74683 20.2812 3.84683 21.3812 5.22183 21.3812C6.59683 21.3812 7.69683 20.2812 7.69683 18.9062C7.69683 17.5656 6.56245 16.4312 5.22183 16.4312ZM5.22183 19.8687C4.7062 19.8687 4.2937 19.4562 4.2937 18.9406C4.2937 18.425 4.7062 18.0125 5.22183 18.0125C5.73745 18.0125 6.14995 18.425 6.14995 18.9406C6.14995 19.4219 5.73745 19.8687 5.22183 19.8687Z"
                  fill=""
                />
                <path
                  d="M19.0062 0.618744H17.15C16.325 0.618744 15.6031 1.23749 15.5 2.06249L14.95 6.01562H1.37185C1.0281 6.01562 0.684353 6.18749 0.443728 6.46249C0.237478 6.73749 0.134353 7.11562 0.237478 7.45937C0.237478 7.49374 0.237478 7.49374 0.237478 7.52812L2.36873 13.9562C2.50623 14.4375 2.9531 14.7812 3.46873 14.7812H12.9562C14.2281 14.7812 15.3281 13.8187 15.5 12.5469L16.9437 2.26874C16.9437 2.19999 17.0125 2.16562 17.0812 2.16562H18.9375C19.35 2.16562 19.7281 1.82187 19.7281 1.37499C19.7281 0.928119 19.4187 0.618744 19.0062 0.618744ZM14.0219 12.3062C13.9531 12.8219 13.5062 13.2 12.9906 13.2H3.7781L1.92185 7.56249H14.7094L14.0219 12.3062Z"
                  fill=""
                />
              </svg>
            </div>
          </CardDataStats>
          <CardDataStats
            title="Số Lượng Sản Phẩm"
            total={productData?.length}
            rate="0.43%"
            levelUp
          >
            <div className="fill-[#3C50E0] bg-[#EFF2F7] rounded-full flex justify-between items-center">
              <svg
                className="fill-primary dark:fill-white m-3 items-start"
                width="28"
                height="28"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                  fill=""
                />
                <path
                  d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                  fill=""
                />
              </svg>
            </div>
          </CardDataStats>
          <CardDataStats
            title="Số Lượng Khách Hàng"
            total={userData?.data.length}
            rate="0.43%"
            levelUp
          >
            <div className="fill-[#3C50E0]  bg-[#EFF2F7] rounded-full flex justify-between items-center">
              <svg
                className="fill-primary dark:fill-white m-3 items-start"
                width="28"
                height="28"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                  fill=""
                />
                <path
                  d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                  fill=""
                />
                <path
                  d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                  fill=""
                />
              </svg>
            </div>
          </CardDataStats>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5 mt-5">
          <ChartRevenueStatistcs />
          <ChartUser />
        </div>
        <div className=" mt-7 flex justify-between">
          {/* <ChartPayment /> */}
          {/* <TableTopProducts /> */}
          <ChartRevenueWeekly />
          <TableTopProducts />
        </div>
        <div className="mt-7 flex space-x-12 w-[100%]">
          <TableOrder />
        </div>
      </div>
    </>
  );
};

export default MainContent;
