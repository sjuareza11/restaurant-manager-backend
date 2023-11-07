import { MongoGenericRepository } from '@src/shared/infraestructure/database/mongo-db/repositories/mongo-generic.repository';
import { Model } from 'mongoose';
export class MongoStorePaymentMethodsRepository<
  T,
> extends MongoGenericRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  getPaymentMethodsByStoreId(storeId: string): Promise<T> {
    return this._repository.findOne({
      storeId: storeId,
    });
  }

  getPaymentMethodByStoreId(
    paymentMethodId: string,
    storeId: string,
  ): Promise<T> {
    return this._repository.findById({
      _id: paymentMethodId,
      storeId,
    });
  }
}
