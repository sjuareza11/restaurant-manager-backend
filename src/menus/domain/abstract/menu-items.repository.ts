import { MenuItemsSearchCriteria } from '../models/menu-items-search-criteria';

export abstract class MenuItemsGenericRepository<T> {
  abstract getAllItemsByStoreAndMenu(searchCriteria: MenuItemsSearchCriteria): Promise<T[]>;

  abstract getItemByIdInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria): Promise<T>;

  abstract createItemInStoreAndMenu(menuItem: T): Promise<T>;

  abstract updateItemInStoreAndMenu(id: string, menuItem: T): Promise<T>;

  abstract deleteItemInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria);
}
