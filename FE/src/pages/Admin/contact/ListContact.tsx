import { useNavigate } from "react-router-dom";
import {
  useContacts,
  useSearchContactByNameOrEmail,
} from "../../../common/hooks/Contact/useContacts";
import { format } from "date-fns";
import { IContact } from "../../../common/interfaces/Contact";
import Loading from "../../../components/base/Loading/Loading";
import { Button, Input, Select, Table } from "antd";
import { useState } from "react";

const ListContact = () => {
  const { contacts, isLoading, error } = useContacts();

  const navigate = useNavigate();
  const [searchContact, setSearchContact] = useState("");
  const { data: searchData } = useSearchContactByNameOrEmail(searchContact);
  const dataSource = (searchContact ? searchData : contacts)?.map(
    (contact: IContact) => ({
      key: contact._id,
      ...contact,
    })
  );
  const onHandleSearch = () => {
    setSearchContact(searchContact.trim());
  };
  const columns = [
    {
      title: "Tên Liên Hệ",
      dataIndex: "name",
      key: "name",
      render: (_: any, contact: IContact) => (
        <>
          <button
            onClick={() => handleViewDetail(contact._id!)}
            className="text-blue-600 hover:underline"
          >
            {contact.name}
          </button>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: " Tin Nhắn",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "  Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, contact: IContact) => (
        <>{formatDate(contact.createdAt)}</>
      ),
    },
    {
      title: "    Thao Tác",
      dataIndex: "content",
      key: "content",
      render: (_: any, contact: IContact) => (
        <>
          {" "}
          <Button
            onClick={() => handleResponse(contact._id!)}
            className="p-3 text-white bg-blue-600 border-gray-300 rounded-lg hover:bg-blue-500 focus:outline-none"
          >
            Phản hồi
          </Button>
        </>
      ),
    },
  ];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const handleViewDetail = (id: string) => {
    navigate(`/admin/contact/${id}`);
  };
  const handleResponse = (id: string) => {
    navigate(`/admin/feedback/${id}`);
  };
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Đã xảy ra lỗi khi lấy dữ liệu: {error.message}</div>;
  }

  return (
    // <div className="flex flex-col mt-5">
    //   <div className="relative flex items-center justify-between mb-3">
    //     <h1 className="text-3xl font-medium">Danh sách contact</h1>
    //   </div>
    //   <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //     <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
    //       <div className="overflow-hidden border border-gray-200 md:rounded-lg">
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-gray-50">
    //             <tr>
    //               <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
    //                 STT
    //               </th>
    //               <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
    //                 Tên contact
    //               </th>
    //               <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
    //                 Email
    //               </th>
    //               <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
    //                 Tin nhắn
    //               </th>
    //               <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
    //                 Ngày tạo
    //               </th>
    //               <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
    //                 Thao tác
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody className="bg-white divide-y divide-gray-200">
    //             {contacts.length > 0 ? (
    //               contacts.map((contact: IContact, index: number) => (
    //                 <tr key={contact._id}>
    //                   <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
    //                     {index + 1}
    //                   </td>
    //                   <td className="px-4 py-4 text-sm text-gray-500">
    //                     <button
    //                       onClick={() => handleViewDetail(contact._id!)}
    //                       className="text-blue-600 hover:underline"
    //                     >
    //                       {contact.name}
    //                     </button>
    //                   </td>
    //                   <td className="px-4 py-4 text-sm text-gray-500">
    //                     {contact.email}
    //                   </td>
    //                   <td className="px-4 py-4 text-sm text-gray-500">
    //                     {contact.content}
    //                   </td>
    //                   <td className="px-4 py-4 text-sm text-gray-500">
    //                     {formatDate(contact.createdAt)}
    //                   </td>
    //                   <td className="px-4 py-4 text-sm">
    //                     <button
    //                       onClick={() => handleResponse(contact._id!)}
    //                       className="p-3 text-white bg-blue-500 border rounded-lg hover:bg-blue-400 focus:outline-none"
    //                     >
    //                       Phản hồi
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))
    //             ) : (
    //               <tr>
    //                 <td
    //                   colSpan={6}
    //                   className="px-4 py-4 text-sm text-center text-gray-500"
    //                 >
    //                   Không có dữ liệu
    //                 </td>
    //               </tr>
    //             )}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="mx-6">
      <div className="flex items-center justify-between mt-20 mb-5">
        <h1 className="text-2xl font-semibold">Quản Lý Liên Hệ</h1>{" "}
      </div>

      <div className="flex justify-between mb-2">
        <div className="space-x-5">
          <Select
            // value={statusFilter}
            // onChange={handleStatusChange}
            className="w-[200px] h-[40px]"
            placeholder="Lọc thời gian tạo"
          ></Select>
        </div>
        <div className="flex space-x-5">
          <Input
            className="w-[500px]"
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
            placeholder="nhâp tên hoặc email của khách hàng liên hệ ..."
          />
          <Button type="primary" onClick={onHandleSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>

      {contacts.length > 0 ? (
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      ) : (
        <tr>
          <td
            colSpan={6}
            className="px-4 py-4 text-sm text-center text-gray-500"
          >
            Không có dữ liệu
          </td>
        </tr>
      )}
    </div>
  );
};

export default ListContact;
