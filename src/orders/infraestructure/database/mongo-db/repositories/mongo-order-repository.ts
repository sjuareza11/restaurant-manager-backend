import { MongoStoreItemsGenericRepository } from '@shared/infraestructure/database/mongo-db/repositories/mongo-store-items-generic.repository';
import { Model } from 'mongoose';

export class MongoOrderRepository<T> extends MongoStoreItemsGenericRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  getItemsByCriteria(criteria: T): Promise<T[]> {
    return this._repository
      .find({
        ...criteria,
      })
      .select('-__v');
  }
}
