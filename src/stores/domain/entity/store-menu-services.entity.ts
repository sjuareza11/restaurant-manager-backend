import { StoreServicesSalesChannel } from './enums/store-services-sales-channel.enum';

export class StoreMenuServiceEntity {
  _id?: string;
  menuId: string;
  salesChannel: StoreServicesSalesChannel;
  minimumOrderAmount: number;
  available: boolean;
}
