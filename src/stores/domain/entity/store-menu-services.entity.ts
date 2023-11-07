import { StoreServicesSalesChannel } from '../enums/store-services-sales-channel.enum';

export interface StoreMenuServiceEntity {
  _id?: string;
  menuId: string;
  salesChannel: StoreServicesSalesChannel;
  minimumOrderAmount: number;
  available: boolean;
}
