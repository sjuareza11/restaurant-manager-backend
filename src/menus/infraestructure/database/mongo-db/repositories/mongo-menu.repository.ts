import { MongoStoreItemsGenericRepository } from '@src/shared/infraestructure/database/mongo-db/repositories/mongo-store-items-generic.repository';
import { Model } from 'mongoose';

export class MongoMenuRepository<T> extends MongoStoreItemsGenericRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  getItemByCriteria(criteria: T): Promise<T> {
    return this._repository
      .findOne({
        ...criteria,
      })
      .select('-__v');
  }
}
