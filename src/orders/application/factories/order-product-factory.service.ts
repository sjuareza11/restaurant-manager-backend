import { Injectable } from '@nestjs/common';
import { OrderProductEntity } from '@src/orders/domain/entities/order-product.entity';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { CreateOrderProductDto } from '../dto/create-order-product.dto';

@Injectable()
export class OrderProductFactoryService implements BaseFactoryService<CreateOrderProductDto, OrderProductEntity> {
  create(dto: CreateOrderProductDto): OrderProductEntity {
    return {
      name: dto.name,
      quantity: dto.quantity,
      price: dto.price,
    };
  }
}
