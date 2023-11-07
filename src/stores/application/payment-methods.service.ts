import { DataService } from '@src/stores/domain/abstract/data-service';
import { PaymentMethodDto } from './dto/payment-method.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentMethodsService {
  constructor(private dataService: DataService) {}

  create(createPaymentMethodDto: PaymentMethodDto) {
    return this.dataService.paymentMethods.create(createPaymentMethodDto);
  }
  findAllByStoreId(storeId: string) {
    return this.dataService.paymentMethods.getPaymentMethodsByStoreId(storeId);
  }
  findOneByStoreId(id: string, storeId: string) {
    return this.dataService.paymentMethods.getPaymentMethodByStoreId(
      id,
      storeId,
    );
  }

  update(id: string, updatePaymentMethodDto: PaymentMethodDto) {
    return this.dataService.paymentMethods.update(id, updatePaymentMethodDto);
  }
  delete(id: string) {
    return this.dataService.paymentMethods.delete(id);
  }
}
