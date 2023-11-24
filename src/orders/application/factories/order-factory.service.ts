import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@src/orders/domain/entities/order.entity';
import { OrderStatus } from '@src/orders/domain/enums/order-status.enum';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderUtils } from '../utils/order.utils';
import { OrderProductFactoryService } from './order-product-factory.service';

@Injectable()
export class CreateOrderFactoryService implements BaseFactoryService<CreateOrderDto, OrderEntity> {
  constructor(private orderProductFactory: OrderProductFactoryService) {}
  create(dto: CreateOrderDto): OrderEntity {
    return {
      _id: dto._id,
      deliveryAddress: dto.deliveryAddress,
      shippingCost: dto.shippingCost,
      channel: dto.channel,
      type: dto.type,
      pickupTime: dto.pickupTime ? new Date(dto.pickupTime) : undefined,
      status: OrderStatus.NEW,
      paymentMethodName: dto.paymentMethodName,
      products: dto.products.map((product) => this.orderProductFactory.create(product)),
      storeId: dto.storeId,
      externalOrderId: OrderUtils.genereteOrderNumber(),
      orderAmount: dto.orderAmount,
      totalOrderAmount: dto.totalOrderAmount,
      customer: dto.customer._id,
    };
  }
}
