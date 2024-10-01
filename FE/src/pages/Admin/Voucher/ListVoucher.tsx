import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Button, Empty, message, Popconfirm, Space, Table } from "antd";
import { IVoucher } from "../../../common/interfaces/Voucher";
import { FaDeleteLeft } from "react-icons/fa6";
import { format } from "date-fns";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const ListVoucher = () => {
  const queryClient = useQueryClient();
  const [messageAPI, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["voucher"],
    queryFn: () => instance.get(`/voucher`),
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

  const dataSource = data?.data?.vouchers.map((voucher: IVoucher) => ({
    key: voucher._id,
    ...voucher,
  }));
  const columns = [
    {
      title: "STT",
      render: (_: any, __, index) => <p>{index + 1}</p>,
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
      render: (_: any, shipper: IVoucher) => (
        <Space>
          <Popconfirm
            title="Xóa mã giảm giá"
            description="Bạn có muốn xóa mã giảm giá này không?"
            onConfirm={() => mutate(shipper._id)}
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
      {/* <Shipper_Detail
        shipperId={ShipperId}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      /> */}

      <div className="mx-6">
        <div className="flex items-center justify-between mt-20 mb-5">
          <h1 className="text-2xl font-semibold">Quản Lý Mã Giảm Giá</h1>

          <Link to={`/admin/voucher/add`}>
            {" "}
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
      </div>
    </div>
  );
};

export default ListVoucher;
