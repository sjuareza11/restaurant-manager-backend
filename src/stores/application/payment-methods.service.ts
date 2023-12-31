import { DataService } from '@src/stores/domain/abstract/data-service';
import { PaymentMethodDto } from './dto/payment-method.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';
import { CreatePaymentMethodsDto } from './dto/create-payment-methods.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private dataService: DataService) {}

  create(createPaymentMethodDto: PaymentMethodDto) {
    return this.dataService.paymentMethods.create(createPaymentMethodDto);
  }

  findAll(storeId: string, options?: QueryOptionsDto) {
    return this.dataService.paymentMethods.getItemsByStoreId(storeId, options);
  }

  findOne(id: string, storeId: string) {
    return this.dataService.paymentMethods.getItemByStoreId(id, storeId);
  }

  update(id: string, updatePaymentMethodDto: PaymentMethodDto) {
    return this.dataService.paymentMethods.update(id, updatePaymentMethodDto);
  }

  remove(id: string, storeId: string) {
    return this.dataService.paymentMethods.deleteByStoreId(id, storeId);
  }

  async updatePaymentMethods(updatePaymentMethods) {
    return Promise.all(
      updatePaymentMethods.paymentMethods.map(async (paymentMethod) => {
        return this.dataService.paymentMethods.update(paymentMethod._id, paymentMethod);
      }),
    );
  }
  async createPaymentMethods(updatePaymentMethods: CreatePaymentMethodsDto) {
    return Promise.all(
      updatePaymentMethods.paymentMethods.map(async (paymentMethod) => {
        return this.dataService.paymentMethods.create(paymentMethod);
      }),
    );
  }
}
