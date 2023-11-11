import { GenericRepository } from '@src/shared/domain/abstract/generic-repository';
import { GetAllOptionsDTO } from '@src/shared/domain/dto/get-all-options.dto';

export abstract class CustomerRepository<T> implements GenericRepository<T> {
  abstract getAll(options: GetAllOptionsDTO): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
