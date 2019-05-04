export interface Product {
  id: string;
  category: string;
  subcategory: string;
  product: string;
  tags: Array<string>;
  description: string;
  price: number;
  maxdiscount: number;
  extrataxes: number;
}
