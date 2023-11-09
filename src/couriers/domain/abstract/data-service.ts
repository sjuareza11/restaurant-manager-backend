import { CourierEntity } from '../entities/courier.entity';
import { CourierRepository } from './courier-repository';

export abstract class DataService {
  abstract couriers: CourierRepository<Partial<CourierEntity>>;
}
