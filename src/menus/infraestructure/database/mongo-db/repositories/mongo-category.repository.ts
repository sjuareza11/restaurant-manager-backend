import { Model } from 'mongoose';
import { MongoMenuItemsRepository } from './mongo-menu-items.repository';

export class MongoCategoryRepository<T> extends MongoMenuItemsRepository<T> {
  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }
}
