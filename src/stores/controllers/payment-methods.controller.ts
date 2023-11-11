import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from '@src/shared/domain/dto/pagination.dto';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { PaymentMethodDto } from '../application/dto/payment-method.dto';
import { PaymentMethodsService } from '../application/payment-methods.service';
import { AddStoreIdInterceptor } from './../../shared/infraestructure/interceptors/add-store-id.interceptor';
import { AuthStoreMemberGuard } from './../application/guards/auth-store-member.guard';

@Controller('stores/:storeId/payment-methods')
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Post()
  create(@Body() createPaymentMethod: PaymentMethodDto) {
    return this.paymentMethodsService.create(createPaymentMethod);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get()
  findAll(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const storeId = req.user['storeId'];

    return this.paymentMethodsService.findAll(storeId, { pagination: paginationDto });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.paymentMethodsService.findOne(id, storeId);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentMethod: PaymentMethodDto) {
    return this.paymentMethodsService.update(id, updatePaymentMethod);
  }

  /**
   * Delete payment method
   * @param id
   */
  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    this.paymentMethodsService.remove(id, storeId);
  }
}
