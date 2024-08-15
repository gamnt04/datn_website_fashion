import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICategory } from "../../../../common/interfaces/Category";
import Message from "../../../../components/base/Message/Message";
import { Input } from "../../../../components/ui/Input";
import { update } from "../../../../services/category";
import { UploadImage } from "../../../../systems/utils/uploadImage";

interface UpdateComponentProps {
  id?: string;
  data: ICategory[];
}

const UpdateComponent = ({ id, data }: UpdateComponentProps) => {
  const queryClient = useQueryClient();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialValues, setInitialValues] = useState<ICategory | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ICategory>({
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
    setInitialValues(findDataById);
    reset(findDataById);
  }, [data, id, reset]);

  const watchFields = watch();

  const isFormModified = () => {
    if (!initialValues) return false;
    const hasNameCategoryChanged =
      watchFields.name_category !== initialValues.name_category;
    const hasImageCategoryChanged =
      (watchFields.image_category instanceof FileList &&
        watchFields.image_category.length > 0) ||
      (typeof watchFields.image_category === "string" &&
        watchFields.image_category !== initialValues.image_category);

    return hasNameCategoryChanged || hasImageCategoryChanged;
  };

  const onSubmit = async (formData: ICategory | any) => {
    try {
      let imageUrl = formData.image_category;
      if (
        formData.image_category instanceof FileList &&
        formData.image_category.length > 0
      ) {
        const file = formData.image_category[0];
        console.log("Selected file:", file);
        const uploadedUrl = await UploadImage(file);
        console.log("Uploaded URL:", uploadedUrl);
        imageUrl = uploadedUrl;
      }

      const updatedCategory = {
        ...formData,
        image_category: imageUrl,
      };
      console.log("Updated Category:", updatedCategory);

      mutation.mutate(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      setErrorMessage("Lỗi khi cập nhật danh mục");
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
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900 text-center">
              Sửa danh mục
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 justify-center">
              <div className="sm:col-span-6 flex justify-center">
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
                    <label
                      htmlFor="image_category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Ảnh danh mục
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <Input
                          type="file"
                          placeholder="Nhập ảnh danh mục..."
                          {...register("image_category")}
                        />
                      </div>
                    </div>
                    <p>
                      {errors.image_category && (
                        <span className="text-red-600">
                          Vui lòng không được để trống
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              disabled={!isFormModified()}
              className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                isFormModified()
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateComponent;
