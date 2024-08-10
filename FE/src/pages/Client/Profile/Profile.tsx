import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  FormProps,
  GetProp,
  UploadFile,
  UploadProps,
  Upload,
  Image
} from "antd";
import dayjs from "dayjs";
import ProfileHook from "../../../common/hooks/Settings/ProfileHook";
import { PlusOutlined } from "@ant-design/icons";

export type FieldType = {
  userName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  avatar?: string;
};
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Profile = () => {
  const {
    contextHolder,
    isChanged,
    setIsChanged, // Thêm hook để cập nhật trạng thái isChanged
    isSaving,
    isLoading,
    isPending,
    isError,
    error,

    handleValuesChange,

    mutate,
    data
  } = ProfileHook();
  const CLOUD_NAME = "dwya9mxip";
  const PRESET_NAME = "upImgProduct";
  const FOLDER_NAME = "PRODUCTS";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Kiểm tra nếu tất cả các file đều có trạng thái "done"
    const allUploaded = newFileList.every((file) => file.status === "done");
    setIsChanged(allUploaded); // Chỉ cho phép lưu khi tất cả các file đã tải lên thành công
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const imageUrls = fileList
      .filter((file) => file.status === "done") // Lọc chỉ các ảnh đã tải lên thành công
      .map((file) => file.response?.secure_url); // Lấy URL từ phản hồi

    // Lấy URL của ảnh đầu tiên trong fileList
    const avatarUrl = imageUrls[0] || "";

    mutate({ ...values, avatar: avatarUrl });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  if (isLoading) return <div>Loading...</div>;
  if (isPending) return <div>Pending...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      {contextHolder}

      <div>
        <div className="border-b-2 mt-[18px]">
          <h2 className="text-xl">Hồ Sơ Của Tôi</h2>
          <p className="py-2 text-sm">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
        <div className="py-8">
          <Form
            name="basic"
            onValuesChange={handleValuesChange}
            initialValues={
              data
                ? {
                    ...data,
                    birthDate: data.birthDate ? dayjs(data.birthDate) : null
                  }
                : {}
            }
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
          >
            <div className="flex flex-row flex-wrap lg:flex-nowrap text-sm">
              <div className="basis-full order-2 lg:order-1 lg:basis-2/3">
                <Form.Item name="userName" label="Tên đăng nhập" rules={[]}>
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Họ và tên" name="fullName">
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Email" name="email">
                  <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Ngày sinh"
                  name="birthDate"
                  rules={[]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={data?.birthDate ? dayjs(data.birthDate) : null}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    className="bg-[#000000] text-[#ffffff] h-[50px]"
                    htmlType="submit"
                    disabled={!isChanged || isSaving} // Disable nút khi chưa thay đổi hoặc đang lưu
                  >
                    {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </Form.Item>
              </div>
              <div className="order-1 border-b p-3 my-4 basis-full lg:order-2 lg:border-b-0 lg:border-l-2 lg:basis-1/3">
                <Form.Item<FieldType> label="Ảnh sản phẩm" name="avatar">
                  <Upload
                    action={api}
                    data={{ upload_preset: PRESET_NAME, folder: FOLDER_NAME }}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    multiple
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage("")
                      }}
                      src={previewImage}
                    />
                  )}
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Profile;
