import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { StoreServicesSalesChannel } from '@src/stores/domain/entity/enums/store-services-sales-channel.enum';
import { StoreMenuServiceEntity } from '@src/stores/domain/entity/store-menu-services.entity';
import { Document } from 'mongoose';
@Schema()
export class StoreMenuService
  extends Document
  implements StoreMenuServiceEntity
{
  @Prop({ type: String, default: generateUUID() })
  _id: string;
  @Prop({ required: true })
  menuId: string;
  @Prop({ type: String, enum: StoreServicesSalesChannel })
  @Prop({ required: true })
  salesChannel: StoreServicesSalesChannel;

  @Prop({ required: true })
  minimumOrderAmount: number;

  @Prop({ default: true })
  available: boolean;
}

export const StoreMenuServiceSchema =
  SchemaFactory.createForClass(StoreMenuService);
StoreMenuServiceSchema.set('timestamps', true);
