import { useState, useEffect } from "react";
import useCategoryMutation from "../../../../common/hooks/Category/useCategoryMutation";
import { ICategory } from "../../../../common/interfaces/Category";
import Message from "../../../../components/base/Message/Message";
import { Input } from "../../../../components/ui/Input";
import { uploadImage } from "../../../../systems/utils/uploadImage"; // Đường dẫn đến uploadImage.ts
import { useForm } from "react-hook-form";

const CreateComponent = () => {
  const [showMessage, setShowMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>();
  const { onSubmit, isPending } = useCategoryMutation({
    action: "CREATE",
  });

  const handleSubmitForm = async (data: ICategory | any) => {
    try {
      if (data.image_category) {
        const imageUrls = await uploadImage(data.image_category);

        // Prepare form data
        const formData = {
          ...data,
          image_category: imageUrls[0], // Gán URL của ảnh từ Cloudinary
        };

        await onSubmit(formData);
        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div>
      <Message
        message={"Thêm danh mục thành công !"}
        timeout={2000}
        openMessage={showMessage}
        type={"success"}
      />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
              Thêm danh mục
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 justify-center">
              <div className="sm:col-span-6 flex justify-center">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                  </div>
                  <label
                    htmlFor="image_category"
                    className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                  >
                    Hình ảnh danh mục
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                      <Input
                        type="file"
                        {...register("image_category", { required: true })}
                      />
                    </div>
                  </div>
                  <p>
                    {errors.image_category && (
                      <span>Vui lòng không được để trống</span>
                    )}
                  </p>
                  <p>
                    {errors.image_category && (
                      <span>Vui lòng chọn hình ảnh</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {isPending ? "Đang thêm" : "Xác nhận"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateComponent;
