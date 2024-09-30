import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { IVoucher } from "../../../common/interfaces/Voucher";
import instance from "../../../configs/axios";
import { format } from "date-fns";
import { ColumnsType } from "antd/es/table";
import { FaDeleteLeft } from "react-icons/fa6";
import { CheckAuths } from "../../../common/hooks/Auth/useAuthorization";
import Loading from "../../../components/base/Loading/Loading";

const List_Voucher: React.FC = () => {
  //   const queryClient = useQueryClient();
  //   const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useQuery({
    queryKey: ["Voucher"],
    queryFn: async () => {
      try {
        return await instance.get(`/voucher`);
      } catch (error) {
        throw new Error("Lỗi");
      }
    },
  });
  console.log(data);

  const dataSource = data?.data?.map((voucher: IVoucher) => ({
    key: voucher._id,
    ...voucher,
  }));

  //   const { mutate: deleteVoucher } = useMutation({
  //     mutationFn: async (id: IVoucher["_id"]) => {
  //       try {
  //         await instance.delete(`/voucher/${id}`);
  //       } catch (error) {
  //         throw new Error("Xóa voucher thất bại");
  //       }
  //     },
  //     onSuccess: () => {
  //       messageApi.success("Xóa voucher thành công");

  //       queryClient.invalidateQueries({ queryKey: ["Voucher"] });
  //     },
  //     onError: (error) => {
  //       messageApi.error(error.message || "Xóa voucher không thành công");
  //     },
  //   });

  //   const mutation = useMutation({
  //     mutationFn: async (category: IVoucher) => {
  //       const response = await instance.put(
  //         `/category/${category._id}`,
  //         category
  //       );
  //       return response.data;
  //     },
  //     onSuccess: () => {
  //       messageApi.success("Cập nhật voucher thành công");
  //       queryClient.invalidateQueries({ queryKey: ["CATEGORY_KEY"] });
  //     },
  //     onError: (error: unknown) => {
  //       console.error("Lỗi khi cập nhật voucher:", error);
  //       messageApi.error(
  //         `Cập nhật voucher không thành công. ${
  //           (error as any).response?.data?.message || "Vui lòng thử lại sau."
  //         }`
  //       );
  //     },
  //   });

  //   const formatDate = (dateString: any) => {
  //     const date = new Date(dateString);
  //     return format(date, "HH:mm dd/MM/yyyy");
  //   };

  //   const handleTogglePublished = (category: IVoucher) => {
  //     mutation.mutate({ ...category, published: !category.published });
  //   };

  //   const handleViewProducts = (category: IVoucher) => {
  //     navigate(`/admin/category/products/${category._id}`);
  //   };

  //   const createFilters = (categories: IVoucher[]) => {
  //     return categories
  //       .map((category: IVoucher) => category.name_voucher)
  //       .filter(
  //         (value: string, index: number, self: string[]) =>
  //           self.indexOf(value) === index
  //       )
  //       .map((name: string) => ({ text: name, value: name }));
  //   };

  const columns: ColumnsType<IVoucher> = [
    // {
    //   key: "checkbox",
    //   title: <Checkbox />,
    //   render: (_: any, cate: IVoucher) => <Checkbox />,
    // },

    {
      key: "name_voucher",
      title: "Tên voucher",
      dataIndex: "name_voucher",
      //   filterSearch: true,
      //   filters: data ? createFilters(data.data) : [],
      //   onFilter: (value: string | any, record: IVoucher) => {
      //     const filterValue = value as string;
      //     return record.name_voucher.includes(filterValue);
      //   },
      //   sorter: (a: IVoucher, b: IVoucher) =>
      //     a.name_voucher.localeCompare(b.name_voucher),
      //   sortDirections: ["ascend", "descend"],
    },
    {
      key: "code_voucher",
      title: "Mã Phiếu",
      dataIndex: "code_voucher",
    },
    {
      key: "description_voucher",
      title: "Mô tả",
      dataIndex: "description_voucher",
    },
    {
      key: "quantity_voucher",
      title: "số lượng",
      dataIndex: "quantity_voucher",
    },
    {
      key: "discountValue",
      title: "Giá giảm",
      dataIndex: "discountValue",
    },
    {
      key: "startDate",
      title: "Ngày Tạo",
      dataIndex: "startDate",
      //   render: (_: any, voucher: IVoucher) => formatDate(voucher.startDate),
    },
    {
      key: "expirationDate",
      title: "Ngày kết thúc",
      dataIndex: "expirationDate",
      //   render: (_: any, voucher: IVoucher) => formatDate(voucher.expirationDate),
    },
    // {
    //   key: "isActive",
    //   title: "Hiển Thị",
    //   dataIndex: "isActive",
    //   render: (published: boolean, record: IVoucher) => (
    //     <Switch
    //       checked={published}
    //       onChange={() => handleTogglePublished(record)}
    //     />
    //   ),
    // },
    // {
    //   key: "action",
    //   title: "Thao Tác",
    //   render: (_: any, voucher: IVoucher) => {
    //     return (
    //       <Space>
    //         {contextHolder}
    //         {/* <CategoryUpdate data={data} id={category._id} /> */}
    //         <Popconfirm
    //           title="Xoá voucher sản phẩm"
    //           description="Bạn có muốn xóa voucher này không ?"
    //           onConfirm={() => deleteVoucher(voucher._id)}
    //           okText="Có"
    //           cancelText="Không"
    //         >
    //           <Button danger>
    //             <FaDeleteLeft />
    //           </Button>
    //         </Popconfirm>
    //       </Space>
    //     );
    //   },
    // },
  ];

  //   const onChangePage = (page: number) => {
  //     setCurrentPage(page);
  //   };

  //   const paginationProps = {
  //     current: currentPage,
  //     pageSize,
  //     total: dataSource.length,
  //     showSizeChanger: false,
  //     pageSizeOptions: [],
  //     showQuickJumper: true,
  //     itemRender: (
  //       page: number,
  //       type: string,
  //       originalElement: React.ReactNode
  //     ) => {
  //       if (type === "page") {
  //         return <a>{page}</a>;
  //       }
  //       if (type === "prev") {
  //         return <a>Trước</a>;
  //       }
  //       if (type === "next") {
  //         return <a>Kế tiếp</a>;
  //       }
  //       return originalElement;
  //     },
  //     onChange: onChangePage,
  //     showTotal: (total: number) => `Tổng ${total} mục`,
  //   };

  return (
    // <CheckAuths roles={["admin"]}>
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-6">
          <div className="flex items-center justify-between mt-20 mb-5">
            <h1 className="text-2xl font-semibold">Quản Lý Voucher</h1>
            {/* <UpdateComponent /> */}
          </div>
          {/* <div className="flex justify-between mb-2">
              <div className="flex space-x-5">
                <Input
                  className="w-[500px]"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Nhập tên voucher để tìm kiếm..."
                />
                <Button onClick={onHandleSearch} type="primary">
                  Tìm kiếm
                </Button>
              </div>
            </div> */}

          <Table dataSource={dataSource} columns={columns} />
          {/* <div className="flex items-center justify-between mt-4">
              <Pagination {...paginationProps} />
            </div> */}
        </div>
      )}
    </>
    // </CheckAuths>
  );
};

export default List_Voucher;
