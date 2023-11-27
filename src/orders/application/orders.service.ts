import { Injectable } from '@nestjs/common';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';
import { DataService } from '../domain/abstract/data-service';
import { OrderCustomerEntity } from '../domain/entities/order-customer.entity';
import { OrderEntity } from '../domain/entities/order.entity';
import { OrderStatus } from '../domain/enums/order-status.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderFactoryService } from './factories/order-factory.service';
import { UpdateOrderFactoryService } from './factories/update-order-factory.service';

@Injectable()
export class OrdersService {
  constructor(
    private dataService: DataService,
    private createOrderFactoryService: CreateOrderFactoryService,
    private uptateOrderFactoryService: UpdateOrderFactoryService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    let customer: OrderCustomerEntity = await this.dataService.customers.getById(createOrderDto.customer._id);
    if (!customer) {
      customer = await this.dataService.customers.create(createOrderDto.customer);
      createOrderDto.customer._id = customer._id;
    }
    const order = this.createOrderFactoryService.create(createOrderDto);
    return this.dataService.orders.create(order);
  }

  findAll(storeId: string, options?: QueryOptionsDto) {
    return this.dataService.orders.getItemsByStoreId(storeId, options);
  }

  findOne(id: string, storeId: string) {
    return this.dataService.orders.getItemByStoreId(id, storeId);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (updateOrderDto.status !== OrderStatus.PENDING_PICKUP_COURIER) {
      updateOrderDto.courier = undefined;
    }
    const order = this.uptateOrderFactoryService.create(updateOrderDto) as OrderEntity;
    return this.dataService.orders.update(id, order);
  }
}
