import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  LoadingOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Timeline } from "antd";

const Status_order = ({ data_Order, notification }: any) => {
  const a = notification?.notifications
    ?.map((item: any) => {
      if (item?.id_different === data_Order.orderNumber) {
        return item?.message;
      }
    })
    .filter(Boolean);

  const timelineItems = [
    {
      status: "1",
      dot: <ClockCircleOutlined style={{ fontSize: "18px" }} />,
      children: `Chờ xác nhận ${
        data_Order?.createdAt
          ? new Date(data_Order?.createdAt).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : ""
      }`,
      color: data_Order?.status >= "1" ? "green" : "gray",
    },
    {
      status: "2",
      dot: <LoadingOutlined style={{ fontSize: "18px" }} />,
      children: `Đang chuẩn bị ${
        data_Order?.statusHistory?.find(
          (history: any) => history.status === "2"
        )?.updatedAt
          ? new Date(
              data_Order?.statusHistory.find(
                (history: any) => history.status === "2"
              ).updatedAt
            ).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : ""
      }`,
      color: data_Order?.status >= "2" ? "green" : "gray",
    },
    {
      status: "3",
      dot: <TruckOutlined style={{ fontSize: "18px" }} />,
      children: `Đang vận chuyển ${
        data_Order?.statusHistory?.find(
          (history: any) => history.status === "3"
        )?.updatedAt
          ? new Date(
              data_Order?.statusHistory.find(
                (history: any) => history.status === "3"
              ).updatedAt
            ).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : ""
      }`,
      color: data_Order?.status >= "3" ? "green" : "gray",
    },
    {
      status: "4",
      dot: <HomeOutlined style={{ fontSize: "18px" }} />,
      children: `Đã giao ${
        data_Order?.statusHistory?.find(
          (history: any) => history.status === "4"
        )?.updatedAt
          ? new Date(
              data_Order?.statusHistory.find(
                (history: any) => history.status === "4"
              ).updatedAt
            ).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : ""
      }`,
      color: data_Order?.status >= "4" ? "green" : "gray",
    },
    {
      status: "5",
      dot: <CloseCircleOutlined style={{ fontSize: "18px" }} />,
      children: (
        <>
          Giao hàng thất bại{" "}
          {data_Order?.statusHistory?.find(
            (history: any) => history.status === "5"
          )?.updatedAt
            ? new Date(
                data_Order?.statusHistory.find(
                  (history: any) => history.status === "5"
                ).updatedAt
              ).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : ""}
          <br />
          Lý do: {a?.length > 0 ? a.join(", ") : ""}
        </>
      ),
      color: data_Order?.status === "5" ? "red" : "gray",
    },
    {
      status: "6",
      dot: <CheckCircleOutlined style={{ fontSize: "18px" }} />,
      children: `Hoàn thành ${
        data_Order?.statusHistory?.find(
          (history: any) => history.status === "6"
        )?.updatedAt
          ? new Date(
              data_Order?.statusHistory.find(
                (history: any) => history.status === "6"
              ).updatedAt
            ).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : ""
      }`,
      color: data_Order?.status === "6" ? "green" : "gray",
    },
    {
      status: "7",
      dot: <CloseCircleOutlined style={{ fontSize: "18px" }} />,
      children: (
        <>
          Giao hàng thất bại{" "}
          {data_Order?.statusHistory?.find(
            (history: any) => history.status === "7"
          )?.updatedAt
            ? new Date(
                data_Order?.statusHistory.find(
                  (history: any) => history.status === "7"
                ).updatedAt
              ).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : ""}
          <br />
          Lý do: {a?.length > 0 ? a.join(", ") : ""}
        </>
      ),
      color: data_Order?.status === "7" ? "red" : "gray",
    },
  ];

  const filteredItems = timelineItems.filter((item) => {
    const currentStatus = Number(data_Order?.status);
    if (currentStatus === 4) {
      // Trạng thái 4: Hiển thị 1, 2, 3, 4, 6
      return ["1", "2", "3", "4", "6"].includes(item.status);
    }
    if (currentStatus === 5) {
      // Trạng thái 5: Hiển thị 1, 2, 3, 5
      return ["1", "2", "3", "5"].includes(item.status);
    }
    if (currentStatus === 6) {
      // Trạng thái 6: Hiển thị 1, 2, 3, 4, 6
      return ["1", "2", "3", "4", "6"].includes(item.status);
    }
    if (currentStatus === 7) {
      // Trạng thái 7: Hiển thị từ trạng thái trước đến 7
      return Number(item.status) <= currentStatus;
    }
    // Các trường hợp còn lại (hiển thị trạng thái tương ứng)
    return Number(item.status) <= currentStatus;
  });

  return (
    <div>
      <Timeline mode="alternate" items={filteredItems} />
    </div>
  );
};

export default Status_order;
