import { ReactNode } from "react";

export interface IProduct {
  name: string;
  _id?: string;
  slug: string;
  price: number;
<<<<<<< HEAD
  image: File | string;
  gallery: (FileList | string)[];
=======
  image: FileList | string[];
  category_id: string[];
  gallery: FileList | string[];
>>>>>>> main
  description: string;
  countInStock: number;
  featured: boolean;
  tag: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}
