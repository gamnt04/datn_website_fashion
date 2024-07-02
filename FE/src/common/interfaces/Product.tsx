import { ReactNode } from "react";

export interface IProduct {
  productId: string;
  quantity: number;
  name: string;
  _id?: string;
  slug: string;
  price: number;
  image: FileList | string[];
  category_id: string[];
  gallery: FileList | string[];
  description: string;
  countInStock: number;
  featured: boolean;
  tag: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}
