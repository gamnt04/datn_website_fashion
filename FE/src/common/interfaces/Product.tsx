import { ReactNode } from "react";
export interface IProduct {
  productId?: string;
  _id?: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category_id: string[];
  countInStock: number;
  featured: boolean;
  image: FileList | string[];
  gallery: FileList | string[];
  colors?: string[];
  sizes?: string[];
  tag: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}
