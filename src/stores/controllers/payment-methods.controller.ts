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

@Controller()
export class PaymentMethodsController {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Post('stores/:storeId/payment-methods')
  create(@Body() createPaymentMethod: PaymentMethodDto) {
    return this.paymentMethodsService.create(createPaymentMethod);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get('stores/:storeId/payment-methods')
  findAll(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const storeId = req.user['storeId'];

    return this.paymentMethodsService.findAll(storeId, { pagination: paginationDto });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get('stores/:storeId/payment-methods/:id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.paymentMethodsService.findOne(id, storeId);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Patch('stores/:storeId/payment-methods/:id')
  update(@Param('id') id: string, @Body() updatePaymentMethod: PaymentMethodDto) {
    return this.paymentMethodsService.update(id, updatePaymentMethod);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Patch('stores/:storeId/payment-methods-bulk')
  updatePaymentMethods(@Body() updatePaymentMethod) {
    return this.paymentMethodsService.updatePaymentMethods(updatePaymentMethod);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Post('stores/:storeId/payment-methods-bulk')
  createPaymentMethods(@Body() createPaymentMethods) {
    return this.paymentMethodsService.createPaymentMethods(createPaymentMethods);
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
