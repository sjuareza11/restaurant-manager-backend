import { UserRepository } from '@src/users/domain/abstract/user.repository';
import { UserEntity } from '../entities/user.entity';
export abstract class DataService {
  abstract users: UserRepository<Partial<UserEntity>>;
}
