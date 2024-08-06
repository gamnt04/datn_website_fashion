import { ReactNode } from "react";

export interface IOrder {
  _id?: string;
  userId: string;
  items: {
    name_size: ReactNode;
    color_item: ReactNode;
    productId: any;
    _id?: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
  }[];
  orderNumber?: string | any;
  customerInfo: {
    userName: string;
    phone: string;
    email: string;
    payment?: string;
    city?: string;
    address?: string;
    code?: string;
  };
  discount: number;
  totalPrice: number;
  status?:
    | "Chờ xác nhận"
    | "Đang chuẩn bị hàng"
    | "Đang vận chuyển"
    | "Đã giao hàng"
    | "Đã hủy";
  datetime?: Date;
}
