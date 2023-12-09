export class OrderStatistics {
  ordersBetweenDates: number;
  orderAmountBetweenDates: number;
  dailyStatistics: { day: string; numberOfOrders: number; totalOrderAmount: number }[];
  averageOrderAmount: number;
  averageOrdersPerDay: number;

  constructor(data?: OrderStatistics) {
    this.ordersBetweenDates = data.ordersBetweenDates;
    this.orderAmountBetweenDates = data.orderAmountBetweenDates;
    this.averageOrderAmount = data.averageOrderAmount;
    this.averageOrdersPerDay = data.averageOrdersPerDay;
    this.dailyStatistics = data.dailyStatistics;
  }
}
