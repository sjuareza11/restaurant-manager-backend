import { MenuItemsSearchCriteria } from '@src/menus/domain/models/menu-items-search-criteria';
import { Model } from 'mongoose';
import { MongoMenuItemsRepository } from './mongo-menu-items.repository';

export class MongoProductRepository<T> extends MongoMenuItemsRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    console.log('populateOnFind', populateOnFind);
    super(repository, populateOnFind);
  }

  findAllProductsByCategoryId(categoryId: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    const { pagination, ...criteria } = secondarySearchCriteria;
    return this._repository
      .find({ categories: { $in: [categoryId] }, ...criteria })
      .populate(this._populateOnFind)
      .limit(pagination?.limit || parseInt(process.env.PAGINATION_DEFAULT_LIMIT))
      .skip(pagination?.offset || parseInt(process.env.PAGINATION_DEFAULT_OFFSET))
      .exec();
  }
}
