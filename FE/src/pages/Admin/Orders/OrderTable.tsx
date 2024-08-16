import { Pagination, Table } from "antd";
import { Link } from "react-router-dom";
import { Ellipsis_horizontal } from "../../../components/common/Client/_component/Icons";
import { IOrder } from "../../../common/interfaces/Orders";
import { ColumnType, SortOrder } from "antd/es/table/interface";

const OrderTable = ({ orders, currentPage, goToPage, totalPages }: any) => {
  const formatDate = (datetime: any) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    return date.toLocaleDateString();
  };
  const dataSort = orders?.map((order: any) => ({
    key: order._id,
    ...order,
  }));
  const createFilters = (order: IOrder[]) => {
    return order
      .map((order: IOrder) => order.orderNumber)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      )
      .map((orderNumber: string) => ({
        text: orderNumber,
        value: orderNumber,
      }));
  };
  const columns: ColumnType<IOrder>[] = [
    {
      title: "Mã đơn",
      dataIndex: "orderNumber",
      key: "orderNumber",
      filterSearch: true,
      filters: orders ? createFilters(orders) : [],
      onFilter: (value: string | any, record: IOrder) => {
        const filterValue = value as string;
        return record.orderNumber.includes(filterValue);
      },
      sorter: (a: IOrder, b: IOrder) =>
        a.orderNumber.localeCompare(b.orderNumber),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Người mua",
      dataIndex: "userName",
      key: "userName",
      render: (_: any, order: any) => <p>{order?.customerInfo?.userName}</p>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (_: any, order: any) => <p>{order?.customerInfo?.phone}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, order: any) => <p>{order?.customerInfo?.email}</p>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "datetime",
      key: "datetime",
      render: (_: any, order: any) => <p>{formatDate(order?.datetime)}</p>,
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
      render: (_: any, order: any) => <p>{order?.customerInfo?.payment}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_: any, order: any) => {
        return (
          <p>
            {order?.cancellationRequested ? order?.cancelledByAdmin ? "Đã xác nhận yêu cầu" : "Yêu cầu gửi lên" : order?.status == 1 ? "Chờ xác nhận" : order?.status == 2 ? "Đang chuẩn bị" : order?.status == 3 ? "Đang vận chuyển" : order?.status == 4 ? "Đã giao hàng" : "Đã hủy"}
          </p>
        );
      },
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_: any, orders: any) => (
        <>
          <Link to={`/admin/orders/${orders._id}/orderDetali`}>
            <span className="flex justify-center">
              <Ellipsis_horizontal />
            </span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="">
      <Table columns={columns} dataSource={dataSort} pagination={false} />
      <div className="flex justify-between items-center mt-4">
        <div className="max-w-full overflow-hidden"></div>
        <Pagination
          current={currentPage}
          pageSize={10}
          total={totalPages * 10}
          onChange={goToPage}
        />
      </div>
    </div>
  );
};

export default OrderTable;
