import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/base/Loading/Loading";
import { useContacts } from "../../../common/hooks/Contact/useContacts";
import { format } from "date-fns";
import { IContact } from "../../../common/interfaces/Contact";

const ListContact = () => {
  const { data, isLoading, refetch, removeContact, error } = useContacts();
  const contacts = data?.data || []; // Truy cập vào mảng contact

  const navigate = useNavigate();
  const [removingContactId, setRemovingContactId] = useState<string | null>(null);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const handleRemove = async (id: string) => {
    if (window.confirm("Bạn có muốn xóa contact này không?")) {
      setRemovingContactId(id);
      try {
        await removeContact(id);
        alert("Xóa thành công");
        refetch();
      } catch (error) {
        alert("Xóa thất bại");
        console.error("Lỗi khi xóa contact:", error);
      } finally {
        setRemovingContactId(null);
      }
    }
  };

  if (error) {
    return <div>Đã xảy ra lỗi khi lấy dữ liệu: {error.message}</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col mt-5">
          <div className="relative flex items-center justify-between mb-3">
            <h1 className="text-3xl font-medium">Danh sách contact</h1>
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">STT</th>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">Tên contact</th>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">Email</th>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">Tin nhắn</th>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">Ngày tạo</th>
                      <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(contacts) && contacts.length > 0 ? (
                      contacts.map((contact: IContact, index: number) => (
                        <tr key={contact._id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{index + 1}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{contact.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{contact.email}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{contact.message}</td>
                          <td className="px-4 py-4 text-sm text-gray-500">{formatDate(contact.createdAt)}</td>
                          <td className="px-4 py-4 text-sm">
                            <button
                              onClick={() => handleRemove(contact._id!)}
                              className={`p-3 text-white border rounded-lg ${removingContactId === contact._id ? "bg-gray-500" : "bg-rose-500 hover:bg-rose-400"} focus:outline-none`}
                              disabled={removingContactId === contact._id}
                            >
                              {removingContactId === contact._id ? "Đang xóa..." : "Xóa"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-4 text-sm text-center text-gray-500">Không có dữ liệu</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListContact;
