import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataService } from '@src/stores/domain/abstract/data-service';
import { StoreRepository } from '@src/stores/domain/abstract/store.repository';
import { Model } from 'mongoose';
import { MongoStoreRepository } from './repositories/mongo-store.repository';
import { Store } from './schemas/store.schema';

@Injectable()
export class MongoDataService implements DataService {
  stores: StoreRepository<Store>;

  constructor(
    @InjectModel(Store.name)
    private StoreRepository: Model<Store>,
  ) {}

  onApplicationBootstrap() {
    this.stores = new MongoStoreRepository<Store>(this.StoreRepository);
  }
}
