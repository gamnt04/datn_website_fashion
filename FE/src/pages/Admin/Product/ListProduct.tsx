/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import {
  Query_Products_Dashboard,
  useQueryProductsSearch
} from "../../../common/hooks/Products/Products";
import { IProduct } from "../../../common/interfaces/Product";
import {
  Button,
  Checkbox,
  Input,
  message,
  Pagination,
  Popconfirm,
  Space,
  Table
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Mutation_items } from "../../../common/hooks/Products/mutation_item";
import ProductPrice from "./_component/productPrice";
const ListProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = Mutation_items("REMOVE_and_REMOVE_MULTIPLE");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { data, isLoading, isError, error } = Query_Products_Dashboard(+(searchParams?.get('_page') || 1));
  const [searchName, setSearchName] = useState("");
  const { data: searchData } = useQueryProductsSearch(searchName);
  const dataSource = (searchName ? searchData : data?.docs)?.map(
    (product: IProduct, index: number) => ({
      key: product._id,
      index: index + 1,
      ...product
    })
  );
  const onHandleSearch = () => {
    setSearchName(searchName.trim());
  };
  const handleRemoveMultiple = () => {
    const products = { productIds: selectedProductIds };
    mutate(products, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Xóa thành công"
        });
        queryClient.invalidateQueries({
          queryKey: ["Product_Dashboard"]
        });
      },
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: error.message
        });
      }
    });
  };


  function handle_page(i: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("_page", String(i));
    setSearchParams(newParams);
  }

  const handleCheckboxChange = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(
        selectedProductIds.filter((id) => id !== productId)
      );
    } else {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
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
      )
    },
    {
      title: "STT",
      dataIndex: "index",
      key: "index"
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
      )
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product",
      render: (_: any, product: any) => (
        <span className="line-clamp-2 max-w-[200px]">
          {product?.name_product}
        </span>
      )
    },
    {
      title: "Giá sản phẩm",
      key: "price_product",
      render: (product: IProduct) => {
        return <ProductPrice attributeId={product.attributes} />;
      }
    },
    {
      title: "Thời gian tạo",
      dataIndex: "created_at",
      key: "createdAt",
      render: (_: any, product: IProduct) => formatDate(product.createdAt)
    },
    {
      title: "Thời gian cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: any, product: IProduct) => formatDate(product.updatedAt)
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
              onConfirm={() =>
                mutate({
                  id_item: product._id,
                  action: "remove"
                })
              }
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
      }
    }
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      {contextHolder}
      <div>
        <div className="flex justify-between mt-36">
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
        <div className="">
          <Input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button onSubmit={() => onHandleSearch}>Tìm Kiếm</Button>
        </div>

        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <div className="my-4 grid place-items-center">
          <Pagination
            defaultCurrent={data?.page}
            total={data?.totalDocs}
            onChange={(i) => handle_page(i)}
          />
        </div>
      </div>
    </>
  );
};

export default ListProduct;
