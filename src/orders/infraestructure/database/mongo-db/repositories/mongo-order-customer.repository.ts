import { CustomerRepository } from '@src/orders/domain/abstract/customer.repository';
import { MongoGenericRepository } from '@src/shared/infraestructure/database/mongo-db/repositories/mongo-generic.repository';
import { Model } from 'mongoose';

export class MongoOrderCustomerRepository<T> extends MongoGenericRepository<T> implements CustomerRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }
}
