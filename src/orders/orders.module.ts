import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateOrderFactoryService } from './application/factories/order-factory.service';
import { OrderProductFactoryService } from './application/factories/order-product-factory.service';
import { OrderStatisticsFactoryService } from './application/factories/order-statistics-factory.service';
import { UpdateOrderFactoryService } from './application/factories/update-order-factory.service';
import { OrderStatisticsService } from './application/order-statistics.service';
import { OrdersService } from './application/orders.service';
import { OrderStatisticsController } from './controllers/order-statistics.controller';
import { OrdersController } from './controllers/orders.controller';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import { OrderCustomer, OrderCustomerSchema } from './infraestructure/database/mongo-db/schemas/order-customer.schema';
import { Order, OrderSchema } from './infraestructure/database/mongo-db/schemas/order.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderCustomer.name, schema: OrderCustomerSchema },
    ]),
  ],
  controllers: [OrdersController, OrderStatisticsController],
  providers: [
    OrdersService,
    { provide: DataService, useClass: MongoDataService },
    CreateOrderFactoryService,
    UpdateOrderFactoryService,
    OrderProductFactoryService,
    OrderStatisticsFactoryService,
    OrderStatisticsService,
  ],
})
export class OrdersModule {}
