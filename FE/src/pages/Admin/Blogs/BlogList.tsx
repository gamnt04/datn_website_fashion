import React, { useState } from "react";
import { Blog } from "../../../common/interfaces/Blog";
import instance from "../../../configs/axios";
import { Button, Table, Popconfirm, message, Switch, Input } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PlusCircleFilled } from "@ant-design/icons";
import parse from "html-react-parser";
import { useSearchBlogByName } from "../../../common/hooks/Blog/querry_blog";

const BlogList: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchName, setSearchName] = useState("");
  const { data: searchData } = useSearchBlogByName(searchName);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await instance.get("/blogs");
      return response.data;
    }
  });

  const dataSource = (searchName ? searchData : data)?.map((blog) => ({
    key: blog._id,
    ...blog
  }));

  const onHandleSearch = () => {
    setSearchName(searchName.trim());
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await instance.delete(`/blogs/${id}`);
      if (response.status === 200) {
        messageApi.success("Xóa thành công");
      } else {
        throw new Error("Xóa blog không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa blog:", error);
      messageApi.error(
        `Xóa blog không thành công. ${
          (error as any).response?.data?.message || "Vui lòng thử lại sau."
        }`
      );
    }
  };

  const mutation = useMutation({
    mutationFn: async (updatedBlog: Blog) => {
      const response = await instance.put(
        `/update_blog/${updatedBlog._id}`,
        updatedBlog
      );
      return response.data;
    },
    onSuccess: () => {
      messageApi.success("Cập nhật blog thành công");
    },
    onError: (error: unknown) => {
      console.error("Lỗi khi cập nhật blog:", error);
      messageApi.error(
        `Cập nhật blog không thành công. ${
          (error as any).response?.data?.message || "Vui lòng thử lại sau."
        }`
      );
    }
  });

  const handleTogglePublished = (blog: Blog) => {
    mutation.mutate({ ...blog, published: !blog.published });
  };

  const renderContentSnippet = (content: string) => {
    const shortContent =
      content.length > 100 ? content.substring(0, 100) + "..." : content;
    return parse(shortContent);
  };

  const extractFirstImage = (content: string) => {
    // Tạo một DOM ảo để phân tích HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    // Tìm thẻ <img> đầu tiên
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };
  const extractH1Content = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const h1Element = doc.querySelector("h1");
    return h1Element ? h1Element.textContent : "Không có tiêu đề";
  };
  const columns = [
    {
      key: "title",
      title: "Tiêu đề",
      dataIndex: "content",
      render: (content: string) => {
        return <div>{extractH1Content(content)}</div>;
      }
    },
    {
      key: "createdAt",
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString()
    },
    {
      key: "author",
      title: "Tác giả",
      dataIndex: "author"
    },
    {
      key: "content",
      title: "Nội dung",
      dataIndex: "content",
      render: (content: string) => {
        return <div>{renderContentSnippet(content)}</div>;
      }
    },
    {
      key: "imageUrl",
      title: "Ảnh",
      dataIndex: "content",
      render: (content: string) => {
        const imageUrl = extractFirstImage(content);
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Blog"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        ) : (
          <span>Không có ảnh</span>
        );
      }
    },
    {
      key: "published",
      title: "Ẩn",
      dataIndex: "published",
      render: (published: boolean, record: Blog) => (
        <Switch
          checked={published}
          onChange={() => handleTogglePublished(record)}
        />
      )
    },
    {
      key: "actions",
      title: "Hành động",
      render: (_: any, blogs: Blog) => (
        <>
          <Popconfirm
            title="Xóa Blog"
            description="Bạn có chắc chắn muốn xóa blog này không?"
            onConfirm={() => handleDelete(blogs._id!)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger type="primary">
              Xóa
            </Button>
          </Popconfirm>
          <Link to={`${blogs._id}`}>
            <Button type="primary">Chỉnh sửa</Button>
          </Link>
        </>
      )
    }
  ];
  if (isLoading) return <div className="">loading...</div>;
  if (isError) return <div className="">{error.message}</div>;

  return (
    <div className="container mx-auto mt-40">
      {contextHolder}
      <div className="flex item-center justify-between">
        <h1 className="text-3xl font-semibold">Danh sách bài viết</h1>
        <Button type="primary">
          <Link to="add_blog">
            <PlusCircleFilled /> Thêm bài viết
          </Link>
        </Button>
      </div>
      <div className="">
        <Input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button onSubmit={() => onHandleSearch}>Tìm kiếm</Button>
      </div>
      {data.length === 0 ? (
        <p>Không có blog nào.</p>
      ) : (
        <Table dataSource={dataSource} rowKey="_id" columns={columns} />
      )}
    </div>
  );
};

export default BlogList;
