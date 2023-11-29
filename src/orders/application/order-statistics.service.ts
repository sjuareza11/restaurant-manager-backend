import { Injectable } from '@nestjs/common';
import { differenceInDays, format, isThisMonth, isToday } from 'date-fns';
import { DataService } from '../domain/abstract/data-service';

@Injectable()
export class OrderStatisticsService {
  constructor(private dataService: DataService) {}

  async getOrdersByCriteria(criteria: any) {
    return await this.dataService.orders.getItemsByCriteria(criteria);
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

  async getStatistics(startDate: Date, endDate: Date, storeId: string) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    startOfYear.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(23, 59, 59, 999);

    const orders = await this.getOrdersByCriteria({
      createdAt: { $gte: startDate, $lte: endDate },
      storeId,
    });

    const dailyOrders = this.getDailyOrders(orders);
    const diffInDays = differenceInDays(endDate, startDate);
    const ordersBetweenDates = orders.length;
    const orderAmountBetweenDates = this.getOrderAmount(orders);
    const averageOrderAmount = orderAmountBetweenDates / ordersBetweenDates;
    const averageOrdersPerDay = ordersBetweenDates / diffInDays;
    const ordersByDay = this.groupOrdersByDay(orders);
    const dailyStatistics = this.getDailyStatistics(ordersByDay);

    return {
      dailyOrders,
      ordersBetweenDates,
      orderAmountBetweenDates,
      dailyStatistics,
      averageOrderAmount,
      averageOrdersPerDay,
    };
  }
}
