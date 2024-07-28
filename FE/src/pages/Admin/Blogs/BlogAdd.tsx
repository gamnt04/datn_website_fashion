import { useState } from "react";
import { Blog } from "../../../common/interfaces/Blog";
import { Button, Modal, Form, Input, Upload, Switch, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "../../../systems/utils/uploadImage";
import instance from "../../../configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddBlogFormProps {
  visible: boolean;
  onClose: () => void;
}

const AddBlogForm: React.FC<AddBlogFormProps> = ({ visible, onClose }) => {
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({
    title: "",
    content: "",
    author: "",
    tags: [],
    published: false,
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (blog: Partial<Blog>) => instance.post("/blogs/add_blog", blog),
    onSuccess: () => {
      messageApi.success("Tạo blog thành công!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onClose();
    },
    onError: (error: any) => {
      messageApi.error(`Lỗi: ${error.response?.data?.message || "Vui lòng thử lại sau."}`);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: any) => {
    if (e.file) {
      const file = e.file;
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      try {
        const uploadedImage: string[] = await uploadImage(file);
        setNewBlog((prev) => ({
          ...prev,
          image: uploadedImage[0],
        }));
      } catch (error) {
        console.error("Lỗi khi tải ảnh:", error);
        messageApi.error("Tải ảnh không thành công. Vui lòng thử lại sau.");
      }
    }
  };

  const handleSubmit = () => {
    const { title, content, author } = newBlog;
    if (!title || !content || !author) {
      messageApi.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    mutation.mutate(newBlog);
  };

  return (
    <Modal
      title="Thêm Blog mới"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {contextHolder}
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input name="title" value={newBlog.title} onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <Input.TextArea name="content" value={newBlog.content} onChange={handleChange} rows={5} />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          name="author"
          rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
        >
          <Input name="author" value={newBlog.author} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Thẻ" name="tags">
          <Input
            name="tags"
            value={newBlog.tags?.join(", ") || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewBlog((prev) => ({
                ...prev,
                tags: e.target.value.split(", "),
              }))
            }
          />
        </Form.Item>
        <Form.Item label="Ảnh" name="image">
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
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
            <Button type="link" onClick={() => setImagePreview(null)}>
              Xóa ảnh
            </Button>
          )}
        </Form.Item>
        <Form.Item name="published" valuePropName="checked">
          <Switch
            checked={newBlog.published}
            onChange={(checked) =>
              setNewBlog((prev) => ({
                ...prev,
                published: checked,
              }))
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo Blog
          </Button>
          <Button type="default" onClick={onClose} style={{ marginLeft: 8 }}>
            Hủy bỏ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogForm;
