import { ReactNode } from "react";
export interface IProduct {
  _id?: string;
  name_product: string;
  price_product: number;
  description_product: string;
  category_id: string[];
  featured_product: boolean;
  image_product: FileList | string[];
  gallery_product: FileList | string[];
  tag_product: string[];
  quantity_product: number;
  attributes: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
  deletedAt?: ReactNode;
}
