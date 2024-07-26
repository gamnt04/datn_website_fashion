/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { IProduct } from "../../../common/interfaces/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { TiDelete } from "react-icons/ti";
import { FaRecycle } from "react-icons/fa";

const TrashProduct = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };
  const { data, isLoading } = useQuery({
    queryKey: ["trash"],
    queryFn: () => instance.get(`/product/trash`),
  });
  const dataSource = data?.data.map((product: IProduct, index: number) => ({
    key: product._id,
    index: index + 1,
    ...product,
  }));
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      try {
        return await instance.delete(`/products/destroy/${id}`);
      } catch (error) {
        throw new Error((error as any).message);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xóa vĩnh viễn sản phẩm thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["trash"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const { mutate: recycle } = useMutation({
    mutationFn: async (id) => {
      try {
        return await instance.patch(`/products/recycle/${id}`);
      } catch (error) {
        throw new Error((error as any).message);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Khôi phục sản phẩm thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["trash"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (_: any, product: any) => (
        <img
          src={product.image_product}
          alt={product.name_product}
          className="w-[80px] h-[80px]"
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product",
      key: "name_product",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price_product",
      key: "price_product",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "createdAt",
      render: (_: any, product: IProduct) => formatDate(product.createdAt),
    },
    {
      title: "Thời gian xóa",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (_: any, product: IProduct) => formatDate(product.updatedAt),
    },
    {
      key: "actions",
      render: (_: any, product: any) => {
        return (
          <Space>
            <Popconfirm
              title="Khôi phục sản phẩm"
              description="Bạn chắc chắn muốn khôi phục lại sản phẩm này chứ?"
              onConfirm={() => recycle(product._id!)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">
                <FaRecycle />
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xóa vĩnh viễn sản phẩm"
              description="Bạn chắc chắn muốn xóa vĩnh viễn sản phẩm này chứ?"
              onConfirm={() => mutate(product._id!)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <TiDelete />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {contextHolder}
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default TrashProduct;
