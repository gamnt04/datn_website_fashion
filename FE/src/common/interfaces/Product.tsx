import { ReactNode } from "react";

export interface IProduct {
  name: string;
  _id?: string;
  slug: string;
  price: number;
  image: File | string;
  gallery: (FileList | string)[];
  description: string;
  countInStock: number;
  featured: boolean;
  tag: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}
