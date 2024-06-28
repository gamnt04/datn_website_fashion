import { ReactNode } from "react";
export interface IProduct {
  name: string;
  _id?: string;
  slug: string;
  price: number;
  image: FileList;
  category_id: string[];
  gallery: FileList | string[];
  description: string;
  countInStock: number;
  featured: string;
  tag: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}
