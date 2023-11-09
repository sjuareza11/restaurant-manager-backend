import { StorePaymentMethodsRepository } from '@src/stores/domain/abstract/store-payment-methods.repository';
import { PaymentMethodEntity } from '../entities/payment-method';
import { StoreEntity } from '../entities/store.entity';
import { StoreRepository } from './store.repository';
export abstract class DataService {
  abstract stores: StoreRepository<Partial<StoreEntity>>;
  abstract paymentMethods: StorePaymentMethodsRepository<Partial<PaymentMethodEntity>>;
}
