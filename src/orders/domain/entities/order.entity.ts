import { AddressEntity } from '@src/shared/domain/entities/address.entity';
import { PaymentMethodsConfig } from '@src/stores/domain/enums/payment-methods-config.enum';
import { OrderChannel } from '../enums/order-channel.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';
import { OrderCourierEntity } from './order-courier.entity';
import { OrderProductEntity } from './order-product.entity';

export interface OrderEntity {
  _id: string;
  deliveryAddress?: AddressEntity;
  shippingCost?: number;
  channel: OrderChannel;
  type: OrderType;
  pickupTime?: Date;
  status: OrderStatus;
  paymentMethodName: PaymentMethodsConfig;
  products: OrderProductEntity[];
  courier?: OrderCourierEntity;
  storeId: string;
  externalOrderId: string;
  orderAmount?: number;
  totalOrderAmount: number;
  customer: string;
}
