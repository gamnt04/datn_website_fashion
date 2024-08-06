// import { useState } from "react";
// import { Blog } from "../../../common/interfaces/Blog";
// import instance from "../../../configs/axios";
// import { Button, Table, Popconfirm, message, Switch } from "antd";
// import AddBlogForm from "./BlogAdd";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import EditBlog from "./BlogEdit";
// import { Link } from "react-router-dom";
// import { BackwardFilled, PlusCircleFilled } from "@ant-design/icons";

// const BlogList: React.FC = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [messageApi, contextHolder] = message.useMessage();

//   const { data: blogs = [], refetch } = useQuery({
//     queryKey: ["blogs"],
//     queryFn: async () => {
//       const response = await instance.get("/blogs");
//       return response.data;
//     }
//   });

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await instance.delete(`/blogs/${id}`);
//       if (response.status === 200) {
//         messageApi.success("Xóa thành công");
//         refetch();
//       } else {
//         throw new Error("Xóa blog không thành công");
//       }
//     } catch (error) {
//       console.error("Lỗi khi xóa blog:", error);
//       messageApi.error(`Xóa blog không thành công. ${(error as any).response?.data?.message|| "Vui lòng thử lại sau."}`);
//     }
//   };

//   const mutation = useMutation({
//     mutationFn: async (updatedBlog: Blog) => {
//       const response = await instance.put(`/blogs/${updatedBlog._id}`, updatedBlog);
//       return response.data;
//     },
//     onSuccess: () => {
//       messageApi.success("Cập nhật blog thành công");
//       refetch();
//     },
//     onError: (error: unknown) => {
//       console.error("Lỗi khi cập nhật blog:", error);
//       messageApi.error(`Cập nhật blog không thành công. ${(error as any).response?.data?.message || "Vui lòng thử lại sau."}`);
//     }
//   });

//   const handleTogglePublished = (blog: Blog) => {
//     mutation.mutate({ ...blog, published: !blog.published });
//   };

//   // const toggleForm = () => {
//   //   setShowForm(!showForm);
//   // };
//   console
//   const columns = [
//     {
//       key: "title",
//       title: "Tiêu đề",
//       dataIndex: "title",
//     },
//     {
//       key: "createdAt",
//       title: "Thời gian",
//       dataIndex: "createdAt",
//       render: (text: string) => new Date(text).toLocaleDateString(),
//     },
//     {
//       key: "author",
//       title: "Tác giả",
//       dataIndex: "author",
//     },
//     {
//       key: "imageUrl",
//       title: "Ảnh",
//       dataIndex: "imageUrl",
//       render: (image: string) => {
//         // console.log("Image URL:", image); // Debugging log
//         return <img src={image} alt="Blog" style={{ width: 100, height: 100, objectFit: 'cover' }} />;
//       },
//     },
//     {
//       key: "published",
//       title: "Đã xuất bản",
//       dataIndex: "published",
//       render: (published: boolean, record: Blog) => (
//         <Switch checked={published} onChange={() => handleTogglePublished(record)} />
//       ),
//     },
//     {
//       key: "actions",
//       title: "Hành động",
//       render: (_: any, blogs: Blog) => (
//         <><Popconfirm
//           title="Xóa Blog"
//           description="Bạn có chắc chắn muốn xóa blog này không?"
//           onConfirm={() => handleDelete(blogs._id!)}
//           okText="Có"
//           cancelText="Không"
//         >
//           <Button danger type="primary">
//             Xóa
//           </Button>
//         </Popconfirm>
        
// <Link to={`${blogs._id}`}>
// <Button type="primary">
//            Chỉnh sửa
//           </Button>
//           </Link>
//           </>
//       ),
//     },
//   ];

//   return (
//     <div className="container mx-auto mt-8">
//       {contextHolder}
//       <div className="flex item-center justify-between">
//             <h1 className="text-3xl font-semibold">Danh sách bài viết</h1>
//           <Button type="primary">
//             <Link to="add_blog">
//             <PlusCircleFilled/> Thêm bài viết
//             </Link>
//           </Button>
//         </div>
//       {blogs.length === 0 ? (
//         <p>Không có blog nào.</p>
//       ) : (
//         <Table dataSource={blogs} rowKey="_id" columns={columns} />
//       )}
//     </div>
//   );
// };

// export default BlogList;
import React, { useState, useRef, useMemo, useContext } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import parse from 'html-react-parser';

const Blog = () => {
	const editor = useRef(null);
	const [content, setContent] = useState('');
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const onSubmit = async () => {
    try {
      const images = doc.querySelectorAll("img");
      const CLOUD_NAME = "dwya9mxip";
  const PRESET_NAME = "upImgProduct";
  const FOLDER_NAME = "PRODUCTS";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const uploadPromises = Array.from(images).map(async (file: any) => {

    const src = file.src;
    const res = await fetch(src);
    const fileBlob = await res.blob();
    const formData = new FormData();
    formData.append("file", fileBlob);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data.secure_url);
    return { originalSrc: src, newSrc: response.data.secure_url };
    
  });

  try {
    const uploadedUrls = await Promise.all(uploadPromises);
    let contentNew = content;
    uploadedUrls.forEach((img) => {
        contentNew = contentNew.replace(img.originalSrc, img.newSrc);
      });
      const {data} = await axios.post(`http://localhost:2004/api/v1/blogs/add_blog`,{content: contentNew}, {headers: {
        "Content-Type": "application/json",
      },})
      console.log(data);
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images");
  }
    } catch (error) {
      
    }
  }
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Viết Blog ...",
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );
	return (
    <>
    <div>{parse(content)}</div>








    
		<JoditEditor
    className='!text-black'
			ref={editor}
			value={content}
			config={config}
			// tabIndex={1} // tabIndex of textarea
			// onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {
        setContent(newContent)
      }}
		/>
    <div>
      <button onClick={() =>{onSubmit()}}>Tạo mới bài viết</button>
    </div>
    </>
	);
};
export default Blog;