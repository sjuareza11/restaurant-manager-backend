import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressEntity } from '@shared/domain/entities/address.entity';
import { generateUUID } from '@shared/domain/utils/uuid';
import { Document } from 'mongoose';
@Schema()
export class Address extends Document implements AddressEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop()
  name: string;
  @Prop()
  latitude: string;
  @Prop()
  longitude: string;
  @Prop()
  zip: number;
  @Prop()
  city: string;
  @Prop()
  province: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
AddressSchema.set('timestamps', true);
