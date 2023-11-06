import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressEntity } from '@shared/domain/entities/address.entity';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document implements AddressEntity {
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
