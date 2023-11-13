import { ShippingCostsEntity } from '@src/stores/domain/entities/shipping-costs.entity';
import { AddressEntity } from '../../../shared/domain/entities/address.entity';
import { StoreMenuServiceEntity } from './store-menu-services.entity';
export interface StoreEntity {
  _id?: string;
  code?: string;
  name: string;
  address: AddressEntity;
  email?: string;
  phone?: string;
  shippingCosts?: ShippingCostsEntity[];
  storeMenuServices?: StoreMenuServiceEntity[];
  organizationId: string | any;
  available: boolean;
}
