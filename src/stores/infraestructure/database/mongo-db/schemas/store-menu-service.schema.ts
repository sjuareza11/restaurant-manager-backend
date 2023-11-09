import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { StoreMenuServiceEntity } from '@src/stores/domain/entities/store-menu-services.entity';
import { StoreServicesSalesChannel } from '@src/stores/domain/enums/store-services-sales-channel.enum';
import { Document } from 'mongoose';
@Schema()
export class StoreMenuService
  extends Document
  implements StoreMenuServiceEntity
{
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({
    type: String,
    ref: 'Menus',
  })
  menuId: string;
  @Prop({ type: String, enum: StoreServicesSalesChannel, required: true })
  salesChannel: StoreServicesSalesChannel;
  @Prop({ required: true })
  minimumOrderAmount: number;
  @Prop({ default: true })
  available: boolean;
}

export const StoreMenuServiceSchema =
  SchemaFactory.createForClass(StoreMenuService);
StoreMenuServiceSchema.set('timestamps', true);
