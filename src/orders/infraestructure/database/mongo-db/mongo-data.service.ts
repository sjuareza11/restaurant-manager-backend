import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerRepository } from '@src/orders/domain/abstract/customer.repository';
import { DataService } from '@src/orders/domain/abstract/data-service';
import { OrderRepository } from '@src/orders/domain/abstract/order.repository';
import { Model } from 'mongoose';
import { MongoOrderCustomerRepository } from './repositories/mongo-order-customer.repository';
import { MongoOrderRepository } from './repositories/mongo-order-repository';
import { OrderCustomer } from './schemas/order-customer.schema';
import { Order } from './schemas/order.schema';

@Injectable()
export class MongoDataService implements DataService {
  orders: OrderRepository<Order>;
  customers: CustomerRepository<OrderCustomer>;
  constructor(
    @InjectModel(Order.name)
    private OrderRepository: Model<Order>,
    @InjectModel(OrderCustomer.name)
    private CustomerRepository: Model<OrderCustomer>,
  ) {}

  onApplicationBootstrap() {
    this.orders = new MongoOrderRepository<Order>(this.OrderRepository, ['customer']);
    this.customers = new MongoOrderCustomerRepository<OrderCustomer>(this.CustomerRepository);
  }
}
