import { ReactNode } from "react";
export interface IProduct {
  name: string;
  _id?: string;
  slug: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  countInStock: number;
  featured: string;
  tag: string[];
  collections?: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}
