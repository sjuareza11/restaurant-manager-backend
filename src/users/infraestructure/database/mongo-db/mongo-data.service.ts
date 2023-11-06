import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataService } from '@users/domain/abstract/data-service';
import { UserRepository } from '@users/domain/abstract/user.repository';
import { Model } from 'mongoose';
import { MongoUserRepository } from './mongo-user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class MongoDataService implements DataService {
  users: UserRepository<User>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<User>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoUserRepository<User>(this.UserRepository);
  }
}
