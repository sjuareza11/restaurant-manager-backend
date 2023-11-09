import { MenuItemsGenericRepository } from '@src/menus/domain/abstract/menu-items.repository';
import { MenuItemsSearchCriteria } from '@src/menus/domain/models/menu-items-search-criteria';
import { Model } from 'mongoose';

export class MongoMenuItemsRepository<T> implements MenuItemsGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }
  getAllItemsByStoreAndMenu(searchCriteria: MenuItemsSearchCriteria): Promise<T[]> {
    const { pagination, ...criteria } = searchCriteria;
    return this._repository
      .find({ ...criteria })
      .limit(pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10)
      .skip(pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET) || 0);
  }

  getItemByIdInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria): Promise<T> {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository.findById({
      _id: id,
      ...criteria,
    });
  }
  createItemInStoreAndMenu(item: T): Promise<T> {
    return this._repository.create(item);
  }
  updateItemInStoreAndMenu(id: string, item: T): Promise<T> {
    return this._repository.findByIdAndUpdate(id, item, { new: true });
  }
  deleteItemInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository.deleteOne({ _id: id, ...criteria });
  }
}
