/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { IProduct } from "../../../common/interfaces/Product";
import { Button, Popconfirm, Space, Table } from "antd";
import { TiDelete } from "react-icons/ti";
import { FaRecycle } from "react-icons/fa";
import { Query_Trash_Item } from "../../../common/hooks/Products/Products";
import { Mutation_items } from "../../../common/hooks/Products/mutation_item";
import ProductPrice from "./_component/productPrice";

const TrashProduct = () => {
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };
  const { mutate } = Mutation_items("RESTORE_ITEM_and_DESTROY_ITEM");
  const { data, isLoading } = Query_Trash_Item();
  const dataSource = data?.map((product: IProduct, index: number) => ({
    key: product._id,
    index: index + 1,
    ...product,
  }));
  // const { mutate } = useMutation({
  //   mutationFn: async (id) => {
  // restore
  //     try {
  //       return await instance.delete(`/products/destroy/${id}`);
  //     } catch (error) {
  //       throw new Error((error as any).message);
  //     }
  //   },
  //   onSuccess: () => {
  //     messageApi.open({
  //       type: "success",
  //       content: "Xóa vĩnh viễn sản phẩm thành công",
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ["Product_Trash"],
  //     });
  //   },
  //   onError: (error) => {
  //     messageApi.open({
  //       type: "error",
  //       content: error.message,
  //     });
  //   },
  // });
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
      key: "price_product",
      render: (product: IProduct) => {
        return <ProductPrice attributeId={product.attributes} />;
      },
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
            <Button
              type="primary"
              onClick={() =>
                mutate({
                  action: "restore",
                  id_item: product._id,
                })
              }
            >
              <FaRecycle />
            </Button>
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
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default TrashProduct;
