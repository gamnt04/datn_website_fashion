import { useState } from "react";
import { Blog } from "../../../common/interfaces/Blog";
import instance from "../../../configs/axios";
import { Button, Table, Popconfirm, message, Switch } from "antd";
import AddBlogForm from "./BlogAdd";
import { useQuery, useMutation } from "@tanstack/react-query";

const BlogList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await instance.get("/blogs");
      return response.data;
    }
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await instance.delete(`/blogs/${id}`);
      if (response.status === 200) {
        messageApi.success("Xóa thành công");
        refetch();
      } else {
        throw new Error("Xóa blog không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa blog:", error);
      messageApi.error(`Xóa blog không thành công. ${error.response?.data?.message || "Vui lòng thử lại sau."}`);
    }
  };

  const mutation = useMutation({
    mutationFn: async (updatedBlog: Blog) => {
      const response = await instance.put(`/blogs/${updatedBlog._id}`, updatedBlog);
      return response.data;
    },
    onSuccess: () => {
      messageApi.success("Cập nhật blog thành công");
      refetch();
    },
    onError: (error: any) => {
      console.error("Lỗi khi cập nhật blog:", error);
      messageApi.error(`Cập nhật blog không thành công. ${error.response?.data?.message || "Vui lòng thử lại sau."}`);
    }
  });

  const handleTogglePublished = (blog: Blog) => {
    mutation.mutate({ ...blog, published: !blog.published });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const columns = [
    {
      key: "title",
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      key: "createdAt",
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      key: "author",
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      key: "published",
      title: "Đã xuất bản",
      dataIndex: "published",
      render: (published: boolean, record: Blog) => (
        <Switch checked={published} onChange={() => handleTogglePublished(record)} />
      ),
    },
    {
      key: "actions",
      title: "Hành động",
      render: (_: any, record: Blog) => (
        <Popconfirm
          title="Xóa Blog"
          description="Bạn có chắc chắn muốn xóa blog này không?"
          onConfirm={() => handleDelete(record._id!)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger type="primary">
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      {contextHolder}
      <Button type="primary" onClick={toggleForm} className="mb-4">
        {showForm ? "Ẩn Form" : "Thêm Blog"}
      </Button>

      <AddBlogForm visible={showForm} onClose={toggleForm} />

      <h2 className="text-2xl font-bold mb-4">Danh sách Blog</h2>
      {blogs.length === 0 ? (
        <p>Không có blog nào.</p>
      ) : (
        <Table dataSource={blogs} rowKey="_id" columns={columns} />
      )}
    </div>
  );
};

export default BlogList;
