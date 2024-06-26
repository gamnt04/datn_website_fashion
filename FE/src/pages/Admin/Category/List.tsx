import React, { useState } from "react";
import { format } from "date-fns";
import useCategoryMutation from "../../../common/hooks/Category/useCategoryMutation";
import useCategoryQuery from "../../../common/hooks/Category/useCategoryQuery";
import { ICategory } from "../../../common/interfaces/Category";
import Dialogs from "../../../components/base/Dialogs/Dialog";
import Loading from "../../../components/base/Loading/Loading";
import CategoryCreate from "./Create";
// import CategoryUpdate from "./Update/index";

const Category: React.FC = () => {
  const { data, isLoading } = useCategoryQuery();
  const [showDialog, setShowDialog] = useState(false);
  const [remove, setRemove] = useState<ICategory>();
  const [alphabetFilter, setAlphabetFilter] = useState<"asc" | "desc">("asc");
  const [dateFilter, setDateFilter] = useState<"all" | "selectedDate">("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const formatDate = (dateString: string | number) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const { mutate } = useCategoryMutation({ action: "DELETE" });

  const handleRemove = (category: ICategory) => {
    setShowDialog(true);
    setRemove(category);
  };

  const handleSubmitDialogs = () => {
    if (showDialog && remove) {
      mutate(remove);
      setShowDialog(false);
    }
  };

  const handleCloseDialogs = () => {
    setShowDialog(false);
  };

  const handleAlphabetFilter = () => {
    setAlphabetFilter(alphabetFilter === "asc" ? "desc" : "asc");
  };

  const handleDateFilter = (selectedValue: "all" | "selectedDate") => {
    setDateFilter(selectedValue);
    if (selectedValue !== "selectedDate") {
      setSelectedDate("");
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setDateFilter("selectedDate");
  };

  const filteredData = data?.sort((a: ICategory, b: ICategory) => {
    const nameA = a.name ?? "";
    const nameB = b.name ?? "";

    if (alphabetFilter === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const dateFilteredData = filteredData?.filter((category: ICategory) => {
    if (dateFilter === "all") return true;

    if (!category.createdAt || isNaN(new Date(category.createdAt).getTime()))
      return false;

    const createdAt = new Date(category.createdAt);

    switch (dateFilter) {
      case "selectedDate":
        const selected = new Date(selectedDate);
        return (
          createdAt.getFullYear() === selected.getFullYear() &&
          createdAt.getMonth() === selected.getMonth() &&
          createdAt.getDate() === selected.getDate()
        );
      default:
        return true;
    }
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {showDialog && (
            <Dialogs
              title={"Xác nhận"}
              value={"Bạn có muốn xóa danh mục này không ?"}
              openDialog={showDialog}
              buttonCancel={"Hủy bỏ"}
              buttonSubmit="Đồng ý"
              onClose={handleCloseDialogs}
              onSubmit={handleSubmitDialogs}
            />
          )}
          <div className="flex flex-col mt-5">
            <div className="flex relative justify-between items-center mb-3">
              <h1 className="text-lg">Danh sách danh mục</h1>
              <CategoryCreate />
            </div>
            <div className="flex items-center mb-5">
              <h1>Sắp xếp theo :</h1>
              <div>
                <button
                  className={`w-28 h-8 border border-gray-300 ml-5 rounded-md hover:bg-orange-200`}
                  onClick={() => handleDateFilter("all")}
                >
                  Tất cả
                </button>
              </div>
              <div>
                <button
                  className={`w-28 h-8 border border-gray-300 ml-5 rounded-md hover:bg-orange-200`}
                  onClick={handleAlphabetFilter}
                >
                  {alphabetFilter === "asc" ? "A-Z" : "Z-A"}
                </button>
              </div>
              <div className="ml-5">
                <input
                  type="date"
                  value={selectedDate ?? ""}
                  onChange={handleDateChange}
                  className="border border-gray-300 w-40 h-8 rounded-md hover:bg-orange-200 focus:bg-orange-200 px-2"
                />
              </div>
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />
                            <button className="flex items-center gap-x-2">
                              <span>STT</span>
                            </button>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Tên danh mục
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Sản phẩm
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Brand
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Ngày tạo
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Ngày chỉnh sửa
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Chức năng
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {dateFilteredData?.map(
                        (category: ICategory, index: number) => (
                          <tr key={index + 1}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <input
                                  type="checkbox"
                                  className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                />
                                <span>{index + 1}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {category.name}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              Có {category.products?.length} sản phẩm
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              Có {category.collections?.length} nhãn hàng
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {category.createdAt &&
                                formatDate(category.createdAt)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {category.updatedAt &&
                                formatDate(category.updatedAt)}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <div className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                  {/* <CategoryUpdate data={data} id={category._id} /> */}
                                </div>
                                <button
                                  onClick={() => handleRemove(category)}
                                  className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Category;
