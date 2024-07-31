import { ReactNode } from "react";
export interface IProduct {
  _id?: string;
  name_product?: string;
  price_product?: number;
  description_product?: string;
  category_id?: string[];
  stock_product: number;
  attributes?: IAttribute[];
  featured_product?: boolean;
  image_product?: FileList | string;
  gallery_product?: string[];
  tag_product?: string[];
  createdAt?: ReactNode;
  updatedAt?: ReactNode;
  deletedAt?: ReactNode;
  deleted?: boolean;
}

export interface ISize {
  name_size: string;
  stock_attribute: number;
  price_attribute: number;
}
export interface IAttribute {
  color: string;
  size: ISize[];
}
