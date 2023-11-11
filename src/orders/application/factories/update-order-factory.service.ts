import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@src/orders/domain/entities/order.entity';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class UpdateOrderFactoryService implements BaseFactoryService<UpdateOrderDto, Partial<OrderEntity>> {
  constructor() {}
  create(dto: UpdateOrderDto): Partial<OrderEntity> {
    return {
      _id: dto._id,
      type: dto.type,
      status: dto.status,
      courier: dto.courier, // Assuming this is the same type in both DTO and entity
      storeId: dto.storeId,
    };
  }
}
