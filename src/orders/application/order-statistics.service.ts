import { Injectable } from '@nestjs/common';
import { parse } from 'date-fns';
import { DataService } from '../domain/abstract/data-service';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { OrderStatisticsFactoryService } from './factories/order-statistics-factory.service';

@Injectable()
export class OrderStatisticsService {
  constructor(
    private dataService: DataService,
    private orderStatisticsFactoryService: OrderStatisticsFactoryService,
  ) {}

  async getOrdersByCriteria(criteria: any) {
    return await this.dataService.orders.getItemsByCriteria(criteria);
  }

  async getStatistics(query: GetStatisticsDto, storeId: string) {
    const startDate = parse(query.startDate, 'dd/MM/yyyy', new Date());
    startDate.setHours(0, 0, 0, 0);
    const endDate = parse(query.endDate, 'dd/MM/yyyy', new Date());
    endDate.setHours(23, 59, 59, 999);
    const orders = await this.getOrdersByCriteria({
      createdAt: { $gte: startDate, $lte: endDate },
      storeId,
    });

    return this.orderStatisticsFactoryService.create({ orders, startDate, endDate });
  }
}
