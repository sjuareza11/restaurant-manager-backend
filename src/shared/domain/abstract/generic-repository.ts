import { QueryOptionsDto } from '../dto/get-all-options.dto';

export abstract class GenericRepository<T> {
  abstract getAll(options?: QueryOptionsDto): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
