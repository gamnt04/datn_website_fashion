import React, { useState, useRef, useMemo, useContext } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import parse from 'html-react-parser';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const BlogAdd = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
	const editor = useRef(null);
	const [content, setContent] = useState('');
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const navigate = useNavigate();
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
    const h1Element = doc.querySelector("h1");
    if(h1Element === null || h1Element.textContent === ''){
      message.error('Tiêu đề không được để trống');
      return;
    }
    const uploadedUrls = await Promise.all(uploadPromises);
    let contentNew = content;
    uploadedUrls.forEach((img) => {
        contentNew = contentNew.replace(img.originalSrc, img.newSrc);
      });
      const {data} = await axios.post(`http://localhost:2004/api/v1/blogs/add_blog`,
        {content: contentNew,
        author: user.user.userName,
        }, 
        {headers: {
        "Content-Type": "application/json",
      },})
      message.success('Tạo mới bài viết thành công');
      navigate('/admin/blogs'); 
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
		<JoditEditor
    className='!text-black mt-20'
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
export default BlogAdd;