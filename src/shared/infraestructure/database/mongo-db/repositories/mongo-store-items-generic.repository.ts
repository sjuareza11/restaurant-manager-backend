import { StoreItemsGenericRepository } from '@src/shared/domain/abstract/store-items-generic.repository';
import { Model } from 'mongoose';
import { QueryOptionsDto } from '../../../../domain/dto/get-all-options.dto';

export class MongoStoreItemsGenericRepository<T> implements StoreItemsGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }
  async getItemsByStoreId(storeId: string, options?: QueryOptionsDto): Promise<{ items: T[]; total: number }> {
    const total = await this._repository.countDocuments({ storeId });

    const page =
      options?.pagination?.offset > -1 ? options.pagination?.offset : parseInt(process.env.PAGINATION_DEFAULT_OFFSET);
    const limit =
      options?.pagination?.limit > -1 ? options.pagination?.limit : parseInt(process.env.PAGINATION_DEFAULT_LIMIT);
    const skip = page > 0 ? (page - 1) * limit : 0;
    const items = await this._repository.find({ storeId }).limit(limit).skip(skip).select('-createdAt -updatedAt -__v');

    return { items, total };
  }

  getItemByStoreId(itemId: string, storeId: string): Promise<T> {
    return this._repository
      .findById({
        _id: itemId,
        storeId,
      })
      .select('-createdAt -updatedAt -__v');
  }

  deleteByStoreId(itemId: string, storeId: string) {
    return this._repository.deleteOne({ _id: itemId, storeId });
  }

  getAll(options?: QueryOptionsDto): Promise<T[]> {
    return this._repository
      .find()
      .limit(options?.pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10)
      .skip(options?.pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET) || 0)
      .select('-createdAt -updatedAt -__v');
  }

  getById(id: any): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .select('-createdAt -updatedAt -__v')
      .exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item, { new: true }).select('-createdAt -updatedAt -__v');
  }
  delete(id: string) {
    return this._repository.findByIdAndDelete(id);
  }
}
