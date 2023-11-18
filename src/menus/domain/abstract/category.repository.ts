import { MenuItemsSearchCriteria } from '../models/menu-items-search-criteria';
import { MenuItemsGenericRepository } from './menu-items.repository';

export abstract class CategoryRepository<T> implements MenuItemsGenericRepository<T> {
  abstract getAllItemsByStoreAndMenu(searchCriteria: MenuItemsSearchCriteria): Promise<{ items: T[]; total: number }>;

  abstract getItemByIdInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria): Promise<T>;


  abstract createItemInStoreAndMenu(menuItem: T): Promise<T>;

  abstract updateItemInStoreAndMenu(id: string, menuItem: T): Promise<T>;

  abstract deleteItemInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria);

  abstract getItemByCode(code: string, secondarySearchCriteria: MenuItemsSearchCriteria): Promise<T>;
}
