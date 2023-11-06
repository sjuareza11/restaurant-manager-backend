import { ShippingCostsEntity } from '@src/stores/domain/entity/shipping-costs.entity';
import { AddressEntity } from './../../../shared/domain/entities/address.entity';
import { StoreMenuServiceEntity } from './store-menu-services.entity';
export class StoreEntity {
  _id?: string;
  code: string;
  name: string;
  address: AddressEntity;
  shippingCosts: ShippingCostsEntity[];
  storeMenuServices: StoreMenuServiceEntity[];
  organizationId: string | any;
  available: boolean;
}
