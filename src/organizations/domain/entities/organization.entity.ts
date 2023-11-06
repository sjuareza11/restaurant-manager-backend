import { AddressEntity } from '@shared/domain/entities/address.entity';

export interface OrganizationEntity {
  _id?: string;
  taxId: string;
  name: string;
  address: AddressEntity;
  email: string;
  ownerId: string | any;
}
