import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { GetStatisticsDto } from '../application/dto/get-statistics.dto';
import { OrderStatisticsService } from './../application/order-statistics.service';

@Controller('orders-statistics')
export class OrderStatisticsController {
  constructor(private orderStatisticsService: OrderStatisticsService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getStatistics(@Req() req: any, @Query() query: GetStatisticsDto) {
    const storeId = req.user['storeId'];
    return this.orderStatisticsService.getStatistics(query, storeId);
  }
}
