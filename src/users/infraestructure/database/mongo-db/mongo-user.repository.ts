import { MongoGenericRepository } from '@src/shared/infraestructure/database/mongo-db/repositories/mongo-generic.repository';
import { Model } from 'mongoose';
export class MongoUserRepository<T> extends MongoGenericRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  getByEmail(email: string): Promise<T> {
    return this._repository.findOne({ email: email }).populate(this._populateOnFind).exec() as Promise<T>;
  }
}
