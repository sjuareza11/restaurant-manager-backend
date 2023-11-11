import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderCustomerEntity } from '@src/orders/domain/entities/order-customer.entity';
import { Organization } from '@src/organizations/infraestructure/database/mongo-db/schemas/organization.schema';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Document } from 'mongoose';

@Schema()
export class OrderCustomer extends Document implements OrderCustomerEntity {
  @Prop({ required: true, default: () => generateUUID() })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  surname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: String, ref: Organization.name, required: true })
  organizationId: string;
}

export const OrderCustomerSchema = SchemaFactory.createForClass(OrderCustomer);
