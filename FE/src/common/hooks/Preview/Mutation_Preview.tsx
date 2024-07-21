import { useMutation } from '@tanstack/react-query';

// Hàm thực hiện gọi API để cập nhật trạng thái xem trước
const previewProduct = async (data: { userId: string; productId: string }) => {
  const response = await fetch(`http://localhost:2004/api/v1/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Mạng không ổn định cần cập nhật lại trạng thái');
  }

  return response.json();
};

// Hook sử dụng `react-query` để tạo mutation
export const Mutation_Preview = () => {
  return useMutation({
    mutationFn: previewProduct,
    onSuccess: (data) => {
      console.log('Thành công:', data);
    },
    onError: (error) => {
      console.error('Thất bại:', error);
    },
  });
};
