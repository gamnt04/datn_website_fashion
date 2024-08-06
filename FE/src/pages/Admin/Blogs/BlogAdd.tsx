import { useState } from "react";
import { Button, Form, Input, Upload, Switch, message } from "antd";
import { BackwardFilled, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { uploadFileCloudinary } from "../../../systems/utils/uploadImage";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
  image?: string;
  published?: boolean;
};

const BlogAdd = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (blogs: FieldType) => {
      try {
        return await instance.post(`/blogs/add_blog`, blogs);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      messageApi.success("Thêm blog thành công!");
      setImagePreview(null);
      setFileList([]);
      form.resetFields();
      navigate("/admin/blogs");
    },
    onError: (error: any) => {
      messageApi.error(`Lỗi: ${error.response?.data?.message || "Vui lòng thử lại sau."}`);
    },
  });

  const onFinish = async (values: FieldType) => {
    if (fileList.length > 0) {
      try {
        const imageUrl = await uploadFileCloudinary(fileList[0].originFileObj);
        values.image = imageUrl;
      } catch (error) {
        messageApi.error("Lỗi tải lên ảnh. Vui lòng thử lại.");
        return;
      }
    }
    mutate(values);
  };

  const handleImageChange = (info: any) => {
    const newFileList = info.fileList.slice(-1).map((file: any) => {
      if (file.originFileObj) {
        return {
          ...file,
          url: URL.createObjectURL(file.originFileObj),
        };
      }
      return file;
    });
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setImagePreview(newFileList[0].url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="mt-10">
      {contextHolder}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Thêm bài viết</h1>
        <Button type="primary">
          <Link to="/admin/blogs">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md mt-10">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          className="mt-4"
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Thẻ" name="tags">
            <Input />
          </Form.Item>

          <Form.Item label="Ảnh" name="image">
            <Upload
              listType="picture-card"
              fileList={fileList.map((file, index) => ({ ...file, uid: index.toString() }))}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageChange}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Xem trước ảnh" style={{ width: "100%" }} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
            {imagePreview && (
              <Button type="link" onClick={() => {
                setImagePreview(null);
                setFileList([]);
              }}>
                Xóa ảnh
              </Button>
            )}
          </Form.Item>
          

          <Form.Item name="published" label="Xuất bản" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Switch />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm Blog
            </Button>
            <Button type="default" style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>
              Hủy bỏ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BlogAdd;