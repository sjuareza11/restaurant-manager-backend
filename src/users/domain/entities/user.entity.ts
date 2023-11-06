export interface UserEntity {
  _id?: string;
  name: string;
  surname: string;
  phone: string;
  password: string;
  email: string;
  refreshToken?: string;
  organizationId?: string | any;
  storeId?: string;
}
