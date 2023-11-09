import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressSchema } from '@shared/infraestructure/database/mongo-db/schemas/address.schema';
import { OrganizationEntity } from '@src/organizations/domain/entities/organization.entity';
import { AddressEntity } from '@src/shared/domain/entities/address.entity';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Document } from 'mongoose';
@Schema()
export class Organization extends Document implements OrganizationEntity {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;
  @Prop({ unique: true, index: true })
  taxId: string;
  @Prop()
  name: string;
  @Prop({ type: AddressSchema })
  address: AddressEntity;
  @Prop({ unique: true, index: true })
  email: string;
  @Prop({ type: String, ref: 'Users', unique: true, index: true })
  ownerId: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.set('timestamps', true);
