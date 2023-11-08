import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CourierEntity } from '@src/couriers/domain/entities/courier.entity';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Document } from 'mongoose';

@Schema()
export class Courier extends Document implements CourierEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({ type: String, unique: true, index: true })
  personalId: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  surname: string;
  @Prop({ type: String, unique: true })
  email: string;
  @Prop()
  phone: string;
  @Prop({ default: false })
  available?: boolean;
  @Prop()
  imageUrl?: string;
  @Prop({
    type: String,
    ref: 'Stores',
  })
  storeId: string;
}

export const CourierSchema = SchemaFactory.createForClass(Courier);
