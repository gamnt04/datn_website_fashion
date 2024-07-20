/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICategory } from "../../../../common/interfaces/Category";
import Message from "../../../../components/base/Message/Message";
import { Input } from "../../../../components/ui/Input";
import { update } from "../../../../services/category";
interface UpdateComponentProps {
  id?: string;
  data: ICategory[];
}
const UpdateComponent = ({ id, data }: UpdateComponentProps) => {
  const queryClient = useQueryClient();
  const [showMessage, setShowMessage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
  });
  const onSubmit = async (data: ICategory) => {
    mutation.mutate(data);
    // console.log(data);
  };
  useEffect(() => {
    const findDataById = data.find((data: ICategory) => data._id === id);
    if (!findDataById) return;
    reset(findDataById);
  }, [data, id, reset]);
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);
  return (
    <div>
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
                      {...register("name", { required: true })}
                    />
                  </div>
                  <p>
                    {errors.name && <span>Vui lòng không được để trống</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <button className="items-center px-4 py-2 mt-5 text-white bg-blue-600 rounded-lg ">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComponent;
