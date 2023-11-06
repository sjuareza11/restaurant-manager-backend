import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShippingCosts extends Document {
  @Prop({ required: true })
  fromPrice: number;

  @Prop({ required: true })
  toPrice: number;

  @Prop({ required: true })
  cost: number;
}

export const ShippingCostsSchema = SchemaFactory.createForClass(ShippingCosts);
