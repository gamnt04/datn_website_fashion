import { ReactNode } from "react";

export interface ICategory {
  name?: string;
  _id?: string;
  slug?: string;
  products?: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
}
