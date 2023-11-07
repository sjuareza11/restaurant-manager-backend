import { StorePaymentMethodsRepository } from '@src/stores/domain/abstract/store-payment-methods.repository';
import { StoreEntity } from '../entity/store.entity';
import { PaymentMethodEntity } from './../entity/payment-method';
import { StoreRepository } from './store.repository';
export abstract class DataService {
  abstract stores: StoreRepository<Partial<StoreEntity>>;
  abstract paymentMethods: StorePaymentMethodsRepository<
    Partial<PaymentMethodEntity>
  >;
}
