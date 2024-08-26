import { useNavigate } from "react-router-dom";
import { useContacts } from "../../../common/hooks/Contact/useContacts";
import { format } from "date-fns";
import { IContact } from "../../../common/interfaces/Contact";
import Loading from "../../../components/base/Loading/Loading";

const ListContact = () => {
  const { contacts, isLoading, error } = useContacts();
  const navigate = useNavigate();

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
                  <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                    STT
                  </th>
                  <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                    Tên contact
                  </th>
                  <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                    Tin nhắn
                  </th>
                  <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                    Ngày tạo
                  </th>
                  <th className="px-4 py-3 text-sm font-normal text-left text-gray-500">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.length > 0 ? (
                  contacts.map((contact: IContact, index: number) => (
                    <tr key={contact._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => handleViewDetail(contact._id!)}
                          className="text-blue-600 hover:underline"
                        >
                          {contact.name}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {contact.email}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {contact.content}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          onClick={() => handleResponse(contact._id!)}
                          className="p-3 text-white border rounded-lg bg-blue-500 hover:bg-blue-400 focus:outline-none"
                        >
                          Phản hồi
                        </button>
                      </td>
                    </tr>
                  ))
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContact;
