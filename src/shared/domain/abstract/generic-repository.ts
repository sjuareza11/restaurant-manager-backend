import { GetAllOptionsDTO } from '../dto/get-all-options.dto';

export abstract class GenericRepository<T> {
  abstract getAll(options: GetAllOptionsDTO): Promise<T[]>;

  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);
}
