export interface Blog {
    _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
  published: boolean;
  imageUrl: string
}