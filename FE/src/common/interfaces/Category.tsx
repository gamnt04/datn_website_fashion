export interface ICategory {
  name?: string;
  image_category?: FileList | string[] | any;
  _id?: string;
  slug?: string;
  products?: string[];
  createdAt?: string | number;
  updatedAt?: string | number;
}
