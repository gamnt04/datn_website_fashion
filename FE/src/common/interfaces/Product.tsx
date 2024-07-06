import { ReactNode } from "react";
export interface IProduct {
  productId?: string;
  _id?: string;
  name_product: string;
  slug: string;
  price_product: number;
  description_product: string;
  category_id: string[];
  countInStock_product: number;
  featured_product: boolean;
  image_product: FileList | string[];
  gallery_product: FileList | string[];
  colors?: string[];
  sizes?: string[];
  tag_product: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
}