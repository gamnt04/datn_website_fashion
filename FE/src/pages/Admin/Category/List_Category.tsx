import React, { useState } from "react";
import {
  Button,
  message,
  Popconfirm,
  Table,
  Pagination,
  Switch,
  Input,
  Space,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";

import { ICategory } from "../../../common/interfaces/Category";
import Loading from "../../../components/base/Loading/Loading";
import CategoryUpdate from "./update";
import { ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateComponent from "./Create";
import instance from "../../../configs/axios";
import {
  useCategoryQuery,
  useSearchCategoryByName,
} from "../../../common/hooks/Category/useCategoryQuery";
import { DeleteOutlined } from "@ant-design/icons";
import { FaDeleteLeft } from "react-icons/fa6";

const List_Category: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useCategoryQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const { data: searchData } = useSearchCategoryByName(searchName);

  const pageSize = 4;

  const dataSource = Array.isArray(searchName && searchData ? searchData : data)
    ? (searchName && searchData ? searchData : data).map(
        (category: ICategory) => ({
          key: category._id,
          ...category,
        })
      )
    : [];
  const onHandleSearch = () => {
    setSearchName(searchName);
  };
  const { mutate: deleteCategory } = useMutation({
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
      queryClient.invalidateQueries({ queryKey: ["CATEGORY_KEY"] });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
      throw error;
    },
  });

  const mutation = useMutation({
    mutationFn: async (category: ICategory) => {
      const response = await instance.put(
        `/category/${category._id}`,
        category
      );
      return response.data;
    },
    onSuccess: () => {
      messageApi.success("Cập nhật danh mục thành công");
      queryClient.invalidateQueries({ queryKey: ["CATEGORY_KEY"] });
    },
    onError: (error: unknown) => {
      console.error("Lỗi khi cập nhật danh mục:", error);
      messageApi.error(
        `Cập nhật danh mục không thành công. ${
          (error as any).response?.data?.message || "Vui lòng thử lại sau."
        }`
      );
    },
  });

  const handleTogglePublished = (category: ICategory) => {
    mutation.mutate({ ...category, published: !category.published });
  };

  const handleViewProducts = (category: ICategory) => {
    navigate(`/admin/category/products/${category._id}`);
  };

  const createFilters = (categories: ICategory[]) => {
    return categories
      .map((category: ICategory) => category.name_category)
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      )
      .map((name: string) => ({ text: name, value: name }));
  };

  const columns: ColumnsType<ICategory> = [
    {
      key: "checkbox",
      title: <Checkbox />,
      render: (_: any, cate: ICategory) => <Checkbox />,
    },
    {
      key: "image_category",
      title: "Ảnh Danh Mục",
      render: (_: any, record: ICategory) => (
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
      key: "name_category",
      title: "Tên Danh Mục",
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
      render: (text: string, record: ICategory) => (
        <a
          onClick={() => handleViewProducts(record)}
          style={{ fontSize: "16px", fontWeight: "inherit" }}
        >
          {text}
        </a>
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
      key: "published",
      title: "Hiển Thị",
      dataIndex: "published",
      render: (published: boolean, record: ICategory) => (
        <Switch
          checked={published}
          onChange={() => handleTogglePublished(record)}
        />
      ),
    },
    {
      key: "action",
      title: "Thao Tác",
      render: (_: any, category: ICategory) => {
        return (
          <div className="flex space-x-5">
            {contextHolder}
            <Popconfirm
              title="Xóa danh mục"
              description="Bạn có muốn xóa danh mục này không?"
              onConfirm={() => deleteCategory(category._id!)}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
            >
              <Button danger>
                <FaDeleteLeft />
              </Button>
            </Popconfirm>

            <CategoryUpdate data={data} id={category._id} />
          </div>
        );
      },
    },
  ];

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginationProps = {
    current: currentPage,
    pageSize,
    total: dataSource.length,
    showSizeChanger: false,
    pageSizeOptions: [],
    showQuickJumper: true,
    itemRender: (
      page: number,
      type: string,
      originalElement: React.ReactNode
    ) => {
      if (type === "page") {
        return <a>{page}</a>;
      }
      if (type === "prev") {
        return <a>Trước</a>;
      }
      if (type === "next") {
        return <a>Kế tiếp</a>;
      }
      return originalElement;
    },
    onChange: onChangePage,
    showTotal: (total: number) => `Tổng ${total} mục`,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-6">
          <div className="flex items-center justify-between mb-5 mt-20">
            <h1 className="text-2xl font-semibold">Quản Lý Danh Mục</h1>
            <UpdateComponent />
          </div>
          <div className="mb-2 flex justify-between">
            <div className="space-x-5">
              <Checkbox className="ml-4" />
              <Button>Chọn tất cả (7)</Button>
              <Popconfirm
                title="Xóa sản phẩm khỏi giỏ hàng?"
                description="Bạn có chắc chắn muốn xóa không?"
                // onConfirm={handleRemoveMultiple}
                okText="Có"
                cancelText="Không"
              >
                <Button danger>
                  <DeleteOutlined style={{ fontSize: "24px" }} />
                  Xóa sản phẩm đã chọn
                </Button>
              </Popconfirm>
            </div>
            <div className="flex space-x-5">
              <Input
                className="w-[500px]"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="nhâp tên danh mục để tìm kiếm..."
              />
              <Button onSubmit={() => onHandleSearch} type="primary">
                Tìm kiếm
              </Button>
            </div>
          </div>

          <Table
            dataSource={dataSource.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            columns={columns}
            pagination={false}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="max-w-full overflow-hidden"></div>
            <Pagination {...paginationProps} />
          </div>
        </div>
      )}
    </>
  );
};

export default List_Category;
