export interface Blog {
    _id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
  published: boolean;
}