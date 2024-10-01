import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Button, Empty, message, Popconfirm, Space, Table, Drawer } from "antd";
import { IVoucher } from "../../../common/interfaces/Voucher";
import { FaDeleteLeft } from "react-icons/fa6";
import { format } from "date-fns";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListVoucher = () => {
  const queryClient = useQueryClient();
  const [messageAPI, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["voucher"],
    queryFn: () => instance.get(`/voucher`),
  });
  const { data: auth } = useQuery({
    queryKey: ["auths"],
    queryFn: () => instance.get(`/auths`),
  });
  const { mutate } = useMutation({
    mutationFn: (id: string) => instance.delete(`voucher/${id}`),
    onSuccess: () => {
      messageAPI.success(`Xóa thành công`);
      queryClient.invalidateQueries({
        queryKey: ["voucher"],
      });
    },
    onError: (error) => {
      messageAPI.error(error.message);
    },
  });

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  // State for drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
  // Open drawer and set selected voucher
  const handleViewDetails = (voucher: IVoucher) => {
    setSelectedVoucher(voucher);
    setOpenDrawer(true);
  };

  const dataSource = data?.data?.vouchers.map((voucher: IVoucher) => ({
    key: voucher._id,
    ...voucher,
  }));

  const columns = [
    {
      title: "STT",
      render: (_: any, __: any, index: any) => <p>{index + 1}</p>,
    },
    {
      title: "Tên mã giảm giá",
      dataIndex: "name_voucher",
      key: "name_voucher",
    },
    {
      title: "Mã giảm giá",
      dataIndex: "code_voucher",
      key: "code_voucher",
    },
    {
      title: "Số lượng ",
      dataIndex: "quantity_voucher",
      key: "quantity_voucher",
    },
    {
      key: "discountType",
      title: "Loại giảm giá",
      dataIndex: "discountType",
      render: (discountType: string) => (
        <span
          style={{ color: discountType === "percentage" ? "green" : "blue" }}
        >
          {discountType === "percentage" ? "Theo %" : "Theo số tiền cố định"}
        </span>
      ),
    },
    {
      title: "Giá trị ",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (text: string) => formatDate(text),
    },
    {
      key: "actions",
      title: "Thao Tác",
      render: (_: any, voucher: IVoucher) => (
        <Space>
          <Popconfirm
            title="Xóa mã giảm giá"
            description="Bạn có muốn xóa mã giảm giá này không?"
            onConfirm={() => mutate(voucher._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>
              <FaDeleteLeft />
            </Button>
          </Popconfirm>
          <Button className=" border-blue-600 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md">
            <Link to={`/admin/voucher/${voucher._id}`}>Cập Nhật</Link>
          </Button>
          <Button onClick={() => handleViewDetails(voucher)}>
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container">
      {contextHolder}

      <div className="mx-6">
        <div className="flex items-center justify-between mt-20 mb-5">
          <h1 className="text-2xl font-semibold">Quản Lý Mã Giảm Giá</h1>

          <Link to={`/admin/voucher/add`}>
            <Button className="px-[6px] h-[38px] text-[14px] font-semibold border-[#1976D2] text-[#1976D2]">
              <AiOutlinePlus className="ml-[3px]" /> THÊM MỚI MÃ GIẢM GIÁ
            </Button>
          </Link>
        </div>

        {data && data.data.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Table dataSource={dataSource} columns={columns} />
        )}

        {/* Voucher details drawer */}
        <Drawer
          title="Chi tiết mã giảm giá"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          width={400}
        >
          {selectedVoucher && (
            <div>
              <p>
                <strong>Tên mã giảm giá:</strong> {selectedVoucher.name_voucher}
              </p>
              <p>
                <strong>Mã giảm giá:</strong> {selectedVoucher.code_voucher}
              </p>
              <p>
                <strong>Số lượng:</strong> {selectedVoucher.quantity_voucher}
              </p>
              <p>
                <strong>Loại mã giảm giá:</strong>{" "}
                {selectedVoucher.discountType}
              </p>
              <p>
                <strong>Giá trị mã giảm giá:</strong>{" "}
                {selectedVoucher.discountValue}
              </p>
              <p>
                <strong>Điều kiện mã giảm giá:</strong>{" "}
                {selectedVoucher.minimumSpend}
              </p>
              <p>
                <strong>Loại giảm giá:</strong>{" "}
                {selectedVoucher.discountType === "percentage"
                  ? "Theo %"
                  : "Theo số tiền cố định"}
              </p>
              <p>
                <strong>Người được dùng:</strong>{" "}
                {selectedVoucher?.allowedUsers &&
                selectedVoucher.allowedUsers.length > 0
                  ? auth?.data
                      ?.filter((user: any) =>
                        selectedVoucher.allowedUsers.includes(user._id)
                      ) // Filter users based on allowedUsers IDs
                      .map((user: any, index: number) => (
                        <span key={index}>
                          {user.userName}
                          {index < selectedVoucher.allowedUsers.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))
                  : "Tất cả"}
              </p>
              <p>
                <strong>Giá trị:</strong> {selectedVoucher.discountValue}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedVoucher.description_voucher}
              </p>

              <p>
                <strong>Thời gian bắt đầu:</strong>{" "}
                {formatDate(selectedVoucher.startDate)}
              </p>
              <p>
                <strong>Thời gian kết thúc:</strong>{" "}
                {formatDate(selectedVoucher.expirationDate)}
              </p>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default ListVoucher;
