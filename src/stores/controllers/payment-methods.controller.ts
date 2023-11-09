import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
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
  findAll(@Req() req: any) {
    const storeId = req.user['storeId'];

    return this.paymentMethodsService.findAllByStoreId(storeId);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.paymentMethodsService.findOneByStoreId(id, storeId);
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
    this.paymentMethodsService.removeByStoreId(id, storeId);
  }
}
