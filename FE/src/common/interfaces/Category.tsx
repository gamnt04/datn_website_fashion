import { ReactNode } from "react";

export interface ICategory {
  name?: string;
  _id?: string;
  slug?: string;
  products?: string[];
  collections?: string[];
  createdAt?: string | number;
  updatedAt?: string | number;
}
