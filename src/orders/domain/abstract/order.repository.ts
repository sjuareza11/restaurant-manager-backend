import { StoreItemsGenericRepository } from '@src/shared/domain/abstract/store-items-generic.repository';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';

export abstract class OrderRepository<T> implements StoreItemsGenericRepository<T> {
  abstract getAll(options?: QueryOptionsDto): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getItemByStoreId(itemId: string, storeId: string): Promise<T>;

  abstract getItemsByStoreId(storeId: string, options?: QueryOptionsDto): Promise<T[]>;

  abstract deleteByStoreId(itemId: string, storeId: string);

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
{
}