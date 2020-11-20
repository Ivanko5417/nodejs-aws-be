export type Product = {
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
}

export type ProductToSave = Omit<Product, 'id'>;

export type SQSProduct = {
  count: string;
  description: string;
  price: string;
  title: string;
}
