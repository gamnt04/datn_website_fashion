import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCategoryMutation from "../../../../common/hooks/Category/useCategoryMutation";
import { ICategory } from "../../../../common/interfaces/Category";
import Message from "../../../../components/base/Message/Message";
import { Input } from "../../../../components/ui/Input";
import { UploadImage } from "../../../../systems/utils/uploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { CheckAuths } from "../../../../common/hooks/Auth/useAuthorization";

const CreateComponent = () => {
  const [showMessage, setShowMessage] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [messageType, setMessageType] = React.useState<"success" | "error">(
    "success"
  );
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ICategory>();

  const { mutateAsync, isLoading } = useCategoryMutation({
    action: "CREATE",
    onSuccess: () => {
      setMessageContent("Thêm danh mục thành công!");
      setMessageType("success");
      setShowMessage(true);
    },
    onError: (error) => {
      setMessageContent("Tên danh mục đã tồn tại");
      setMessageType("error");
      setShowMessage(true);
      console.error("Lỗi khi gửi yêu cầu: ", error);
    },
  });

  const handleSubmitForm = async (data: ICategory) => {
    try {
      if (data.image_category && data.image_category[0]) {
        const imageFile = data.image_category[0];
        const imageUrl = await UploadImage(imageFile);

        const formData = {
          ...data,
          image_category: imageUrl,
        };

        await mutateAsync(formData);
        queryClient.invalidateQueries({ queryKey: ["CATEGORY_KEY"] });
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu: ", error);
    }
  };

  const imageCategory = watch("image_category");

  useEffect(() => {
    if (imageCategory && imageCategory[0]) {
      const file = imageCategory[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageCategory]);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <CheckAuths roles={["admin"]}>
      <div>
        <Message
          message={messageContent}
          timeout={2000}
          openMessage={showMessage}
          type={messageType}
        />
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="space-y-12">
            <div className="pb-12 border-b border-gray-900/10">
              <h2 className="text-2xl font-semibold leading-7 text-center text-gray-900">
                Thêm danh mục
              </h2>
              <div className="grid justify-center grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="flex justify-center sm:col-span-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name_category"
                      className="block text-[16px] font-medium leading-6 text-gray-900"
                    >
                      Tên danh mục
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                        <Input
                          type="text"
                          placeholder="Nhập tên danh mục..."
                          {...register("name_category", { required: true })}
                        />
                      </div>
                      {errors.name_category && (
                        <p className="text-red-600">
                          Tên danh mục là bắt buộc!
                        </p>
                      )}
                    </div>
                    <label
                      htmlFor="image_category"
                      className="block text-[16px] font-medium leading-6 text-gray-900 mt-4"
                    >
                      Hình ảnh danh mục
                    </label>
                    <div className="flex items-center mt-2">
                      <div className="relative flex items-center">
                        <div
                          className={`flex items-center justify-center w-32 h-32 border border-gray-300 rounded-lg bg-gray-100 mr-2 ${
                            imagePreview ? "block" : "block"
                          }`}
                        >
                          <span className="text-3xl text-gray-500">+</span>
                        </div>
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Xem trước hình ảnh"
                            className="object-cover w-32 h-32 border border-gray-300 rounded-lg"
                          />
                        )}
                        <Input
                          type="file"
                          {...register("image_category", { required: true })}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6 gap-x-6">
            <button
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              {isLoading ? "Đang thêm..." : "Xác nhận"}
            </button>
          </div>
        </form>
      </div>
    </CheckAuths>
  );
};

export default CreateComponent;
