/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { Query_Products } from "../../../common/hooks/Products/Products";
import { IProduct } from "../../../common/interfaces/Product";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Link } from "react-router-dom";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
const ListProduct = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading, isError, error } = Query_Products();
  const dataSource = data?.map((product: IProduct, index: number) => ({
    key: product._id,
    index: index + 1,
    ...product,
  }));

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      try {
        return await instance.delete(`/products/${id}`);
      } catch (error) {
        throw new Error((error as any).message);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["Product_Key"],
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
      render: (_: any, product: IProduct) => (
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
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: any, product: IProduct) => formatDate(product.updatedAt),
    },
    {
      key: "actions",
      render: (_: any, product: IProduct) => {
        return (
          <Space>
            <Button type="primary">
              <Link to={`/admin/products/edit/${product._id}`}>
                <FaEdit />
              </Link>
            </Button>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn chắc chắn muốn xóa sản phẩm này chứ?"
              onConfirm={() => mutate(product._id!)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>
                <FaDeleteLeft />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      {contextHolder}
      <div className="mt-10">
        <Link to="/admin/products/add" className="flex justify-end mb-2">
          <Button type="primary">
            <FaPlus />
            Thêm sản phẩm
          </Button>
        </Link>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
};

export default ListProduct;
