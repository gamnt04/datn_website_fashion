import { useState } from "react";
import { Button, Form, Input, Upload, Switch, message, FormProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFileCloudinary } from "../../../systems/utils/uploadImage";
import instance from "../../../configs/axios";
import { useMutation } from "@tanstack/react-query";

type FieldType = {
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
  image?: string;
  published?: boolean;
};

const AddBlogForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileList, setFileList] = useState<File[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: async (blogs: FieldType) => {
      try {
        return await instance.post("/blogs/add_blog", blogs);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: () => {
      messageApi.success("Tạo blog thành công!");
      form.resetFields();
      setImagePreview(null);
      setFileList([]);
    },
    onError: (error: any) => {
      messageApi.error(`Lỗi: ${error.response?.data?.message || "Vui lòng thử lại sau."}`);
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (fileList.length > 0) {
      try {
        // Check if fileList contains valid file objects with URLs
        const validFiles = fileList.every((file: any) => file.originFileObj && file.url);
        if (!validFiles) {
          messageApi.error("Lỗi: Tệp không hợp lệ. Vui lòng chọn lại tệp.");
          return;
        }
  
        const imageUrls = await uploadFileCloudinary(fileList[0]);
        values.image = imageUrls[0]; // Gán URL của ảnh từ Cloudinary vào form values
      } catch (error) {
        console.log(error);
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
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
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
              form.setFieldsValue({ image: null });
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
            Tạo Blog
          </Button>
          <Button type="default" style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
            Hủy bỏ
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBlogForm;
