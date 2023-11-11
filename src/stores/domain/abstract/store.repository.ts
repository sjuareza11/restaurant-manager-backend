import { GenericRepository } from '@shared/domain/abstract/generic-repository';
import { QueryOptionsDto } from '@shared/domain/dto/get-all-options.dto';

export abstract class StoreRepository<T> implements GenericRepository<T> {
  abstract getAll(options?: QueryOptionsDto): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getStoreByOrganizationId(storeId: string, organizationId: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
