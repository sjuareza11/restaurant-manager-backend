export class CourierEntity {
  _id: string;
  personalId: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  available?: boolean;
  imageUrl?: string;
  storeId: string;
}
