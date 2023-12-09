/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { OrderEntity } from '@src/orders/domain/entities/order.entity';
import { OrderStatistics } from '@src/orders/domain/models/order-statistics';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { differenceInDays, format, isThisMonth, isToday } from 'date-fns';

@Injectable()
export class OrderStatisticsFactoryService
  implements BaseFactoryService<{ orders: OrderEntity[]; startDate: Date; endDate: Date }, OrderStatistics>
{
  create(data: { orders: OrderEntity[]; startDate: Date; endDate: Date }): OrderStatistics {
    const diffInDays = differenceInDays(data.endDate, data.startDate);
    const ordersBetweenDates = data.orders.length;
    const orderAmountBetweenDates = this.getOrderAmount(data.orders);
    const averageOrderAmount = orderAmountBetweenDates / ordersBetweenDates;
    const averageOrdersPerDay = ordersBetweenDates / diffInDays;
    const ordersByDay = this.groupOrdersByDay(data.orders);
    const dailyStatistics = this.getDailyStatistics(ordersByDay);

    return {
      ordersBetweenDates,
      orderAmountBetweenDates,
      averageOrderAmount,
      averageOrdersPerDay,
      dailyStatistics,
    };
  }

  getDailyOrders(orders: any[]) {
    return orders.filter((order) => isToday(order.createdAt)).length;
  }

  getMonthlyOrders(orders: any[]) {
    return orders.filter((order) => isThisMonth(order.createdAt));
  }

  getOrderAmount(orders: any[]) {
    return orders.reduce((sum, order) => sum + order.totalOrderAmount, 0);
  }

  groupOrdersByDay(orders: any[]) {
    return orders.reduce((groups, order) => {
      const day = format(order.createdAt, 'yyyy-MM-dd');
      if (!groups[day]) {
        groups[day] = [];
      }
      groups[day].push(order);
      return groups;
    }, {});
  }

  getDailyStatistics(ordersByDay: any) {
    return Object.entries(ordersByDay).map(([day, orders]) => {
      const numberOfOrders = (orders as any).length;
      const totalOrderAmount = (orders as any).reduce((sum, order) => sum + order.totalOrderAmount, 0);
      return { day, numberOfOrders, totalOrderAmount };
    });
  }
}
