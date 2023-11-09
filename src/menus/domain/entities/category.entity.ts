export class CategoryEntity {
  _id: string;
  name: string;
  description: string;
  code: string;
  available: boolean;
  menuId: string;
  storeId: string;
  imageUrl?: string;
  order: number;
}
