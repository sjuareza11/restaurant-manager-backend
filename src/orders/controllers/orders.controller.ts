import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { PaginationDto } from '@src/shared/domain/dto/pagination.dto';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { ApiKeyAuthGuard } from '@src/shared/infraestructure/guards/api-key-auth.guard';
import { AddStoreIdInterceptor } from '@src/shared/infraestructure/interceptors/add-store-id.interceptor';
import { CreateOrderDto } from '../application/dto/create-order.dto';
import { UpdateOrderDto } from '../application/dto/update-order.dto';
import { OrdersService } from '../application/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const storeId = req.user['storeId'];
    return this.ordersService.findAll(storeId, { pagination: paginationDto });
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.ordersService.findOne(id, storeId);
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
