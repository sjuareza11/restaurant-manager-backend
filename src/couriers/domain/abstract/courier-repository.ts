import { StoreItemsGenericRepository } from '@src/shared/domain/abstract/store-items-generic.repository';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';

export abstract class CourierRepository<T> implements StoreItemsGenericRepository<T> {
  abstract getAll(options?: QueryOptionsDto): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getItemByStoreId(itemId: string, storeId: string): Promise<T>;

  abstract getItemsByStoreId(storeId: string, options?: QueryOptionsDto): Promise<{ items: T[]; total: number }>;

  abstract deleteByStoreId(itemId: string, storeId: string);

  abstract getItemByCriteria(criteria: Partial<T>): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
