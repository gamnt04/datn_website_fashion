import { Button, message, Popconfirm, Table } from "antd";
import useCategoryQuery from "../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../common/interfaces/Category";
import Loading from "../../../components/base/Loading/Loading";
import CategoryUpdate from "./update";
import { ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateComponent from "./Create";

import instance from "../../../configs/axios";

const List_Category: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useCategoryQuery();
  const [messageApi, contextHolder] = message.useMessage();
  // Đảm bảo data là mảng và có cấu trúc đúng
  const dataSource = Array.isArray(data)
    ? data.map((category: ICategory) => ({
        key: category._id,
        ...category,
      }))
    : [];

  const { mutate } = useMutation({
    mutationFn: async (id: ICategory) => {
      try {
        return await instance.delete(`/category/${id}`);
      } catch (error) {
        throw new Error("Xóa Danh mục thất bại");
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xóa Danh mục thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["CATEGORY_KEY"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
      throw error;
    },
  });
  //   const { mutate } = useCategoryMutation({ action: "DELETE" });

  //   const handleDelete = (id: string | undefined) => {
  //     if (!id) {
  //       console.error("Category ID is missing");
  //       return;
  //     }

  //     console.log(`Deleting category with ID: ${id}`); // Log the ID to debug
  //     mutate(id);
  //   };
  const createFilters = (products: ICategory[]) => {
    return products
      .map((product: ICategory) => product.name_category)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      )
      .map((name: string) => ({ text: name, value: name }));
  };
  const columns: ColumnsType<ICategory> = [
    {
      key: "name_category",
      title: "Tên Danh mục",
      dataIndex: "name_category",
      filterSearch: true,
      filters: data ? createFilters(data) : [],
      onFilter: (value: string | any, record: ICategory) => {
        const filterValue = value as string;
        return record.name_category.includes(filterValue);
      },
      sorter: (a: ICategory, b: ICategory) =>
        a.name_category.localeCompare(b.name_category),
      sortDirections: ["ascend", "descend"],
    },
    {
      key: "image_category",
      title: "Ảnh Danh mục",
      render: (text: any, record: ICategory) => (
        <img
          src={
            typeof record.image_category === "string"
              ? record.image_category
              : URL.createObjectURL(record.image_category[0])
          }
          alt={record.name_category}
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      key: "createdAt",
      title: "Ngày Tạo",
      dataIndex: "createdAt",
    },
    {
      key: "updatedAt",
      title: "Ngày Sửa",
      dataIndex: "updatedAt",
    },
    {
      key: "action",
      render: (_: any, category: ICategory) => {
        return (
          <div className="flex space-x-3">
            {contextHolder}
            <Popconfirm
              title="Xóa danh mục"
              description="Bạn có muốn xóa danh mục này không?"
              onConfirm={() => mutate(category._id!)} // Use handleDelete to log the ID
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Button>
              <CategoryUpdate data={data} id={category._id} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
            <UpdateComponent />
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </>
      )}
    </>
  );
};

export default List_Category;
