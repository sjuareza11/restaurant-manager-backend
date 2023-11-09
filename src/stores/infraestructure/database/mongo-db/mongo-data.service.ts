import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataService } from '@src/stores/domain/abstract/data-service';
import { StorePaymentMethodsRepository } from '@src/stores/domain/abstract/store-payment-methods.repository';
import { StoreRepository } from '@src/stores/domain/abstract/store.repository';
import { PaymentMethodEntity } from '@src/stores/domain/entities/payment-method';
import { Model } from 'mongoose';
import { MongoStorePaymentMethodsRepository } from './repositories/mongo-store-payments-methods.repository';
import { MongoStoreRepository } from './repositories/mongo-store.repository';
import { PaymentMethod } from './schemas/payment-method.schema';
import { Store } from './schemas/store.schema';

@Injectable()
export class MongoDataService implements DataService {
  stores: StoreRepository<Store>;
  paymentMethods: StorePaymentMethodsRepository<Partial<PaymentMethodEntity>>;

  constructor(
    @InjectModel(Store.name)
    private StoreRepository: Model<Store>,
    @InjectModel(PaymentMethod.name)
    private PaymentMethodRepository: Model<PaymentMethod>,
  ) {}

  onApplicationBootstrap() {
    this.stores = new MongoStoreRepository<Store>(this.StoreRepository);
    this.paymentMethods = new MongoStorePaymentMethodsRepository<PaymentMethod>(this.PaymentMethodRepository);
  }
}
