import { AddressEntity } from '@shared/domain/entities/address.entity';

export class OrganizationEntity {
  _id?: string;
  taxId: string;
  name: string;
  address: AddressEntity;
  email: string;
  ownerId: string | any;
}
