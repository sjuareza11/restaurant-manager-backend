import { GenericRepository } from '@shared/domain/abstract/generic-repository';
import { GetAllOptionsDTO } from '@shared/domain/dto/get-all-options.dto';

export abstract class StorePaymentMethodsRepository<T>
  implements GenericRepository<T>
{
  abstract getAll(options: GetAllOptionsDTO): Promise<T[]>;

  abstract getById(id: string): Promise<T>;

  abstract getPaymentMethodByStoreId(
    paymentMethodId: string,
    storeId: string,
  ): Promise<T>;

  abstract getPaymentMethodsByStoreId(storeId: string): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);

  abstract delete(id: string);
}
