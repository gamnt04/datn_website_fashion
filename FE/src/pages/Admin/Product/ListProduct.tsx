/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  formatDate,
  Query_Products,
} from "../../../common/hooks/Products/Products";
import { IProduct } from "../../../common/interfaces/Product";
import { Button, Checkbox, message, Popconfirm, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Mutation_items_client } from "../../../common/hooks/Products/mutation_item";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
const ListProduct = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: removeMultiple } = Mutation_items_client("REMOVE_MULTIPLE");
  const { mutate: softDelete } = Mutation_items_client("SOFT_DELETE");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { data, isLoading, isError, error } = Query_Products();
  const dataSource = data?.map((product: IProduct, index: number) => ({
    key: product._id,
    index: index + 1,
    ...product,
  }));
  const handleRemoveMultiple = () => {
    const products = { productIds: selectedProductIds };
    removeMultiple(products, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Xóa thành công",
        });
      },
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      },
    });
  };

  // const softDeleteProduct = () => {
  //   softDelete({});
  // };

  const handleCheckboxChange = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_: any, product: IProduct) => (
        <Checkbox
          onChange={() => handleCheckboxChange(product?._id)}
        ></Checkbox>
      ),
    },
    {
      title: "STT",
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
      render: (_: any, product: any) => (
        <span className="line-clamp-2 max-w-[200px]">
          {product?.name_product}
        </span>
      ),
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
      render: (_: any, product: any) => {
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
              onConfirm={() => softDelete(product._id!)}
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
      <div>
        <div className="flex justify-between">
          {" "}
          <Popconfirm
            title="Xóa sản phẩm khỏi giỏ hàng?"
            description="Bạn có chắc chắn muốn xóa không?"
            onConfirm={handleRemoveMultiple}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>
              <DeleteOutlined style={{ fontSize: "24px" }} />
              Xóa sản phẩm đã chọn
            </Button>
          </Popconfirm>
          <Link to="/admin/products/add" className="flex justify-end mb-2">
            <Button type="primary">
              <FaPlus />
              Thêm sản phẩm
            </Button>
          </Link>
        </div>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
};

export default ListProduct;
