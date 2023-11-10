import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@shared/domain/utils/uuid';
import { Address, AddressSchema } from '@shared/infraestructure/database/mongo-db/schemas/address.schema';
import { Document } from 'mongoose';
import { StoreEntity } from '../../../../domain/entities/store.entity';
import { ShippingCosts, ShippingCostsSchema } from './shipping-costs.schema';
import { StoreMenuService, StoreMenuServiceSchema } from './store-menu-service.schema';

@Schema()
export class Store extends Document implements StoreEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({ required: true, unique: true })
  code: string;
  @Prop({ required: true })
  name: string;
  @Prop({ default: false })
  available: boolean;
  @Prop({ type: [ShippingCostsSchema] })
  shippingCosts: Array<ShippingCosts>;
  @Prop({ type: [StoreMenuServiceSchema] })
  storeMenuServices: Array<StoreMenuService>;
  @Prop({ type: AddressSchema })
  address: Address;
  @Prop({
    type: String,
    ref: 'Organization',
    unique: true,
    index: true,
  })
  organizationId: string;
}
export const StoreSchema = SchemaFactory.createForClass(Store);
StoreSchema.set('timestamps', true);
