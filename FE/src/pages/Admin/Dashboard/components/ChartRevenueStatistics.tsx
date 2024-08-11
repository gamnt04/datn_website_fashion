import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useOrdersByMonthOfYear } from "../../../../common/hooks/Order/querry_Order";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left"
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1
    },
    toolbar: {
      show: false
    }
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300
        }
      }
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350
        }
      }
    }
  ],
  stroke: {
    width: [2, 2],
    curve: "straight"
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5
    }
  },
  xaxis: {
    type: "category",
    categories: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12"
    ],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px"
      }
    },
    min: 0
  }
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartRevenueStatistcs: React.FC = () => {
  const { data: orderByMonthOfYearData } = useOrdersByMonthOfYear();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const totalPrice = orderByMonthOfYearData?.data?.reduce(
    (sum: number, order) => {
      return sum + order.totalRevenue;
    },
    0
  );

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Doanh Thu",
        data: []
      },
      {
        name: "Số Lượng Đơn Hàng",
        data: []
      }
    ]
  });

  useEffect(() => {
    if (orderByMonthOfYearData) {
      const revenueData = Array(12).fill(0);
      const orderCountData = Array(12).fill(0);
      orderByMonthOfYearData?.data?.forEach((item) => {
        const monthIndex = item.month - 1;
        revenueData[monthIndex] = item.totalRevenue;
        orderCountData[monthIndex] = item.totalOrders;
      });
      setState({
        series: [
          {
            name: "Doanh Thu",
            data: revenueData
          },
          {
            name: "Số Lượng Đơn Hàng",
            data: orderCountData
          }
        ]
      });
    }
  }, [orderByMonthOfYearData]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <h4 className="text-xl my-5 font-semibold text-black dark:text-white">
        Doanh Thu và Số Lượng Đơn Hàng Các Tháng Trong Năm Nay
      </h4>
      <div className="flex items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-[700px]  gap-3 sm:gap-5">
          <div className="flex w-full ">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#3C50E0]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#3C50E0]"></span>
            </span>
            <div className="w-full flex space-x-2">
              <p className="font-semibold text-[#3C50E0]">Tổng Doanh Thu: </p>{" "}
              <span> {formatCurrency(totalPrice)}</span>
            </div>
          </div>{" "}
          <div className="flex w-full ">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#80CAEE]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#80CAEE]"></span>
            </span>
            <div className="w-full flex space-x-2">
              <p className="font-semibold text-[#80CAEE]">
                Tổng Số Lượng Đơn Hàng:{" "}
              </p>{" "}
              <span> {formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
        <div className="flex w-[200] justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <div className="relative z-20 inline-block">
              <select
                name="#"
                id="#"
                className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              >
                <option value="" className="dark:bg-boxdark">
                  Năm 2024
                </option>
                <option value="" className="dark:bg-boxdark">
                  Năm 2023
                </option>
              </select>
              <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                    fill="#637381"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.22659 0.546578Z"
                    fill="#637381"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartRevenueStatistcs;
