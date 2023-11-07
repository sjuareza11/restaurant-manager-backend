import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourierRepository } from '@src/couriers/domain/abstract/courier-repository';
import { DataService } from '@src/couriers/domain/abstract/data-service';
import { Model } from 'mongoose';
import { MongoCourierRepository } from './repositories/mongo-courier-repository';
import { Courier } from './schemas/courier.schema';

@Injectable()
export class MongoDataService implements DataService {
  couriers: CourierRepository<Courier>;
  constructor(
    @InjectModel(Courier.name)
    private CourierRepository: Model<Courier>,
  ) {}

  onApplicationBootstrap() {
    this.couriers = new MongoCourierRepository<Courier>(this.CourierRepository);
  }
}
