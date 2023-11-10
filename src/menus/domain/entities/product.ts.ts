export class ProductEntity {
  _id: string;
  name: string;
  description: string;
  code: string;
  available: boolean;
  menuId: string;
  storeId: string;
  imageUrl?: string;
  order: number;
  price: number;
  categories?: string[];
}
