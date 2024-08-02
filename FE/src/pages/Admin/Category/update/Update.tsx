/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICategory } from "../../../../common/interfaces/Category";
import Message from "../../../../components/base/Message/Message";
import { Input } from "../../../../components/ui/Input";
import { update } from "../../../../services/category";
import { uploadImage } from "../../../../systems/utils/uploadImage";
import { Form, Switch } from "antd";

interface UpdateComponentProps {
  id?: string;
  data: ICategory[];
}

const UpdateComponent = ({ id, data }: UpdateComponentProps) => {
  const queryClient = useQueryClient();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name_category: "",
      image_category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (category: ICategory) => {
      const { data } = await update(category);
      return data;
    },
    onSuccess: () => {
      setShowMessage(true);
      queryClient.invalidateQueries({
        queryKey: ["CATEGORY_KEY"],
      });
    },
    onError: (error: any) => {
      setErrorMessage(error.message || "Đã có lỗi xảy ra");
    },
  });

  useEffect(() => {
    const findDataById = data.find((data: ICategory) => data._id === id);
    if (!findDataById) return;
    reset(findDataById);
  }, [data, id, reset]);

  const onSubmit = async (formData: ICategory) => {
    try {
      let imageUrl = formData.image_category; // giữ nguyên URL nếu không thay đổi

      // Kiểm tra nếu có tệp tin mới được chọn
      if (
        formData.image_category &&
        formData.image_category[0] instanceof File
      ) {
        const file = formData.image_category[0];
        const uploadedUrls = await uploadImage(file); // tải lên ảnh mới
        imageUrl = uploadedUrls[0]; // lấy URL của ảnh mới
      }

      const updatedCategory = {
        ...formData,
        image_category: imageUrl,
      };

      mutation.mutate(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);

  return (
    <div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Message
        message={"Sửa danh mục thành công !"}
        timeout={3000}
        openMessage={showMessage}
        type={"success"}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ml-5">
          <div>
            <div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tên danh mục
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <Input
                      type="text"
                      placeholder="Nhập tên danh mục..."
                      {...register("name_category", { required: true })}
                    />
                  </div>
                  <p>
                    {errors.name_category && (
                      <span>Vui lòng không được để trống</span>
                    )}
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <Input
                      type="file"
                      placeholder="Nhập ảnh danh mục..."
                      {...register("image_category")}
                    />
                  </div>
                  <p>
                    {errors.image_category && (
                      <span>Vui lòng không được để trống</span>
                    )}
                  </p>
                  <Form.Item name="published" label="Xuất bản" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Switch />
          </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center">
          <button className=" bg-blue-600 py-2 px-4 rounded-lg text-white mt-5 items-center">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComponent;
