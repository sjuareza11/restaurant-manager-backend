import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressSchema } from '@shared/infraestructure/database/mongo-db/schemas/address.schema';
import { OrganizationEntity } from '@src/organizations/domain/entities/organization.entity';
import { AddressEntity } from '@src/shared/domain/entities/address.entity';
import { Document, Types } from 'mongoose';

@Schema()
export class Organization extends Document implements OrganizationEntity {
  @Prop({ unique: true, index: true })
  taxId: string;
  @Prop()
  name: string;
  @Prop({ type: AddressSchema })
  address: AddressEntity;
  @Prop({ unique: true, index: true })
  email: string;
  @Prop({ type: Types.ObjectId, ref: 'User', unique: true, index: true })
  ownerId: Types.ObjectId;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.set('timestamps', true);
