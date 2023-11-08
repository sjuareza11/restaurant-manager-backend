import { GetAllOptionsDTO } from '../dto/get-all-options.dto';

export abstract class StoreItemsGenericRepository<T> {
  abstract getAll(options?: GetAllOptionsDTO): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getItemByStoreId(itemId: string, storeId: string): Promise<T>;

  abstract getItemsByStoreId(
    storeId: string,
    options?: GetAllOptionsDTO,
  ): Promise<T[]>;

  abstract deleteByStoreId(itemId: string, storeId: string);

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}