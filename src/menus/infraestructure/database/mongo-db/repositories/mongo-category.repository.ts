import { MenuItemsSearchCriteria } from '@src/menus/domain/models/menu-items-search-criteria';
import { Model } from 'mongoose';
import { MongoMenuItemsRepository } from './mongo-menu-items.repository';

export class MongoCategoryRepository<T> extends MongoMenuItemsRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  getAllProductsFromCategoryInContext(categoryId: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository
      .find({ _id: categoryId, criteria })
      .populate(this._populateOnFind)
      .limit(pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT) || 10)
      .skip(pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET) || 0)
      .exec();
  }
}
