import { StoreEntity } from '../entity/store.entity';
import { StoreRepository } from './store.repository';
export abstract class DataService {
  abstract stores: StoreRepository<Partial<StoreEntity>>;
}
