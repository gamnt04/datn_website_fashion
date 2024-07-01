export interface IOrder {
  _id?: string;
  userId: string;
  items: {
    _id?: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  }[];
  orderNumber?: string;
  customerInfo: {
    userName: string;
    phone: string;
    email: string;
    payment?: string;
    city?: string;
    address?: string;
    code?: string;
  };
  totalPrice: number;
  status?: "Chờ xác nhận" | "Đang chuẩn bị hàng" | "Đang vận chuyển" | "Đã giao hàng" | "Đã hủy";
  datetime?: Date;
}
