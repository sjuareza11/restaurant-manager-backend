import { StoreItemsGenericRepository } from '@src/shared/domain/abstract/store-items-generic.repository';
import { Model } from 'mongoose';
import { GetAllOptionsDTO } from '../../../../domain/dto/get-all-options.dto';

export class MongoStoreItemsGenericRepository<T> implements StoreItemsGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }
  getItemsByStoreId(storeId: string, options: GetAllOptionsDTO): Promise<T[]> {
    return this._repository
      .find({ storeId })
      .limit(options?.pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10)
      .skip(options?.pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET) || 0);
  }
  getItemByStoreId(itemId: string, storeId: string): Promise<T> {
    return this._repository.findById({
      _id: itemId,
      storeId,
    });
  }
  deleteByStoreId(itemId: string, storeId: string) {
    return this._repository.deleteOne({ _id: itemId, storeId });
  }

  getAll(options?: GetAllOptionsDTO): Promise<T[]> {
    return this._repository
      .find()
      .limit(options?.pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10)
      .skip(options?.pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET) || 0);
  }

  getById(id: any): Promise<T> {
    return this._repository.findById(id).populate(this._populateOnFind).exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item, { new: true });
  }
  delete(id: string) {
    return this._repository.findByIdAndDelete(id);
  }
}
