import { GenericRepository } from '@shared/domain/abstract/generic-repository';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';

export abstract class UserRepository<T> implements GenericRepository<T> {
  abstract getAll(options?: QueryOptionsDto): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getByEmail(email: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
