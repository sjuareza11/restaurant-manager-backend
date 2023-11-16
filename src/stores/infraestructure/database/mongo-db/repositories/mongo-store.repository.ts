import { MongoGenericRepository } from '@src/shared/infraestructure/database/mongo-db/repositories/mongo-generic.repository';
import { Model } from 'mongoose';
export class MongoStoreRepository<T> extends MongoGenericRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  getStoreByOrganizationId(storeId: string, organizationId: string): Promise<T> {
    return this._repository.findOne({
      _id: storeId,
      organizationId,
    });
  }
  getItemByCode(code: string, organizationId: string): Promise<T> {
    return this._repository.findOne({
      code,
      organizationId,
    });
  }
}
