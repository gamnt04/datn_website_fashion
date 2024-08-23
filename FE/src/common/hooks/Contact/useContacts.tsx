import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:2004/api/v1/contact";

// Hàm để lấy danh sách contact
const fetchContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data.data; // Điều chỉnh để lấy đúng dữ liệu từ phản hồi API
};

// Hàm để xóa contact
const removeContact = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const useContacts = () => {
  const queryClient = useQueryClient();

  // Sử dụng useQuery để lấy dữ liệu
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  // Sử dụng useMutation để xóa contact
  const mutation = useMutation({
    mutationFn: removeContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });

  return {
    contacts: data || [], // Trả về dữ liệu liên hệ hoặc mảng rỗng nếu không có dữ liệu
    isLoading,
    error,
    refetch,
    removeContact: mutation.mutate,
  };
};
