import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderChannel } from '@src/orders/domain/enums/order-channel.enum';
import { OrderStatus } from '@src/orders/domain/enums/order-status.enum';
import { OrderType } from '@src/orders/domain/enums/order-type.enum';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { Address } from '@src/shared/infraestructure/database/mongo-db/schemas/address.schema';
import { PaymentMethodsConfig } from '@src/stores/domain/enums/payment-methods-config.enum';
import { Store } from '@src/stores/infraestructure/database/mongo-db/schemas/store.schema';
import { Document } from 'mongoose';
import { OrderCourier, OrderCourierSchema } from './order-courier.schema';
import { OrderCustomer } from './order-customer.schema';
import { OrderProduct, OrderProductSchema } from './order-product.schema';

@Schema()
export class Order extends Document {
  @Prop({ type: String, default: () => generateUUID() })
  _id: string;

  @Prop()
  deliveryAddress?: Address;

  @Prop()
  shippingCost?: number;

  @Prop({ required: true })
  channel: OrderChannel;

  @Prop({ required: true, enum: OrderType })
  type: OrderType;

  @Prop()
  pickupTime?: Date;

  @Prop({ type: String, enum: OrderStatus, required: true, default: OrderStatus.NEW })
  status: OrderStatus;

  @Prop({ required: true, enum: PaymentMethodsConfig })
  paymentMethodName: PaymentMethodsConfig;

  @Prop({ type: [OrderProductSchema], required: true })
  products: Array<OrderProduct>;

  @Prop({ type: OrderCourierSchema })
  courier?: OrderCourier;

  @Prop({ type: String, ref: Store.name, required: true })
  storeId: string;

  @Prop({ required: true, unique: true })
  externalOrderId: string;

  @Prop()
  orderAmount?: number;

  @Prop()
  createdAt: Date;

  @Prop({ required: true })
  totalOrderAmount: number;

  @Prop({ type: String, ref: OrderCustomer.name, required: true })
  customer: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.set('timestamps', true);
