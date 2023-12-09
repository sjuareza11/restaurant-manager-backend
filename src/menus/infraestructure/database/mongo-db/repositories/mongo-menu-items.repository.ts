import { MenuItemsGenericRepository } from '@src/menus/domain/abstract/menu-items.repository';
import { MenuItemsSearchCriteria } from '@src/menus/domain/models/menu-items-search-criteria';
import { Model } from 'mongoose';

export class MongoMenuItemsRepository<T> implements MenuItemsGenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind.map((field) => field.toLowerCase());
  }
  async getAllItemsByStoreAndMenu(searchCriteria: MenuItemsSearchCriteria): Promise<{ items: T[]; total: number }> {
    const { pagination, ...criteria } = searchCriteria;
    const total = await this._repository.countDocuments({ ...criteria });

    const page = pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET);
    const limit = pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT);
    const skip = page > 0 ? (page - 1) * limit : 0;
    const items = await this._repository
      .find({ ...criteria })
      .populate(this._populateOnFind)
      .limit(limit)
      .skip(skip)
      .select('-__v')
      .sort({ order: 1 })
      .exec();

    return { items, total };
  }

  getItemByIdInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria): Promise<T> {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository
      .findById({
        _id: id,
        ...criteria,
      })
      .populate(this._populateOnFind)
      .sort({ updatedAt: -1 })
      .exec() as Promise<T>;
  }

  getItemByCode(code: string, secondarySearchCriteria: MenuItemsSearchCriteria): Promise<T> {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository.findOne({
      code: code,
      ...criteria,
    });
  }

  async createItemInStoreAndMenu(item: T): Promise<T> {
    if (this._populateOnFind.length > 0) {
      const createdItem = await this._repository.create(item);
      return this._repository.populate(createdItem, this._populateOnFind as any);
    }

    return this._repository.create(item);
  }
  updateItemInStoreAndMenu(id: string, item: T): Promise<T> {
    return this._repository
      .findByIdAndUpdate(id, item, { new: true })
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }
  deleteItemInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository.deleteOne({ _id: id, ...criteria });
  }
}
