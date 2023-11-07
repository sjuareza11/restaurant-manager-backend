import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateUUID } from '@shared/domain/utils/uuid';
import { Document } from 'mongoose';
@Schema()
export class ShippingCosts extends Document {
  @Prop({ type: String, default: generateUUID() })
  _id: string;
  @Prop({ required: true })
  fromPrice: number;

  @Prop({ required: true })
  toPrice: number;

  @Prop({ required: true })
  cost: number;
}

export const ShippingCostsSchema = SchemaFactory.createForClass(ShippingCosts);
