import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrderProduct extends Document {
  @Prop()
  name: string;
  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  imageUrl: string;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);
