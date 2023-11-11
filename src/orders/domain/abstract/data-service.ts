import { OrderCustomerEntity } from '../entities/order-customer.entity';
import { OrderEntity } from '../entities/order.entity';
import { CustomerRepository } from './customer.repository';
import { OrderRepository } from './order.repository';

export abstract class DataService {
  abstract orders: OrderRepository<OrderEntity>;
  abstract customers: CustomerRepository<OrderCustomerEntity>;
}
