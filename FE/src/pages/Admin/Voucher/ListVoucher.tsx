import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import {
  Button,
  Empty,
  message,
  Popconfirm,
  Space,
  Table,
  Drawer,
  Switch,
} from "antd";
import { IVoucher } from "../../../common/interfaces/Voucher";
import { FaDeleteLeft } from "react-icons/fa6";
import { format } from "date-fns";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
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
  const { data: shippersData } = useQuery({
    queryKey: ["shippers"],
    queryFn: () => instance.get(`/shippers`),
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
  const mutation = useMutation({
    mutationFn: async (category: IVoucher) => {
      const response = await instance.put(`/voucher/${category._id}`, category);
      return response.data;
    },
    onSuccess: () => {
      messageAPI.success("Cập nhật Voucher thành công");
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
    onError: (error: unknown) => {
      console.error("Lỗi khi cập nhật Voucher:", error);
      messageAPI.error(
        `Cập nhật Voucher không thành công. ${
          (error as any).response?.data?.message || "Vui lòng thử lại sau."
        }`
      );
    },
  });
  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);
  const handleViewDetails = (voucher: IVoucher) => {
    setSelectedVoucher(voucher);
    setOpenDrawer(true);
  };
  const handleTogglePublished = (category: IVoucher) => {
    mutation.mutate({ ...category, isActive: !category.isActive });
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
      key: "isActive",
      title: "Hiển Thị",
      dataIndex: "isActive",
      render: (isActive: boolean, record: IVoucher) => (
        <Switch
          checked={isActive}
          onChange={() => handleTogglePublished(record)}
        />
      ),
    },
    {
      key: "actions",
      title: "Thao Tác",
      render: (_: any, voucher: IVoucher) => (
        <Space>
          <Button onClick={() => handleViewDetails(voucher)}>
            <FaEye />
          </Button>
          <Button type="primary">
            <Link
              to={`/admin/voucher/${voucher._id}`}
              className="flex items-center"
            >
              <FaEdit />
            </Link>
          </Button>
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
                <strong>Loại mã giảm giá:</strong>{" "}
                {selectedVoucher.discountType === "percentage"
                  ? "Giảm giá theo phần trăm(%)"
                  : " Giảm giá theo số tiền cố định (VND)"}
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
                <strong>Giá trị tối đa:</strong> {selectedVoucher.maxDiscount}
              </p>
              <p>
                <strong>Số lượng tạo:</strong>{" "}
                {selectedVoucher.quantity_voucher}
              </p>
              <p>
                <strong>Số lượng đã được sử dụng:</strong>{" "}
                {selectedVoucher.usedCount}
              </p>
              <p>
                <strong>Số lượng còn lại:</strong>
                {selectedVoucher.quantity_voucher - selectedVoucher.usedCount}
              </p>
              <p>
                <strong>Thời gian bắt đầu:</strong>{" "}
                {formatDate(selectedVoucher.startDate)}
              </p>
              <p>
                <strong>Thời gian kết thúc:</strong>{" "}
                {formatDate(selectedVoucher.expirationDate)}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedVoucher.description_voucher}
              </p>
              <p>
                <strong>Người được dùng:</strong>
                {selectedVoucher?.allowedUsers &&
                selectedVoucher.allowedUsers.length > 0
                  ? [...(auth?.data || []), ...(shippersData?.data || [])]
                      .filter((user: any) =>
                        selectedVoucher.allowedUsers.includes(user._id)
                      )
                      .map((user: any, index: number) => (
                        <span key={index}>
                          {user.userName} {user.fullName}
                          {user.role === "courier"
                            ? "( shipper )"
                            : "( Người dùng )"}
                          {index < selectedVoucher.allowedUsers.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))
                  : "Tất cả"}
              </p>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default ListVoucher;
