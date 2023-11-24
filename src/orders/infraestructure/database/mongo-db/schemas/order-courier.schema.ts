import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrderCourier extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({})
  surname: string;

  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  personalId: string;
}

export const OrderCourierSchema = SchemaFactory.createForClass(OrderCourier);
