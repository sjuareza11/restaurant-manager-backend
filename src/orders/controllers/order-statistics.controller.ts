import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { parse } from 'date-fns';
import { OrderStatisticsService } from './../application/order-statistics.service';

@Controller('orders-statistics')
export class OrderStatisticsController {
  constructor(private orderStatisticsService: OrderStatisticsService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getStatistics(@Req() req: any, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    const storeId = req.user['storeId'];
    const startDateFormat = parse(startDate, 'dd/MM/yyyy', new Date());
    const endDateFormat = parse(endDate, 'dd/MM/yyyy', new Date());
    return this.orderStatisticsService.getStatistics(new Date(startDateFormat), new Date(endDateFormat), storeId);
  }
}
