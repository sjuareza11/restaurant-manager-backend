import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresService } from './application/stores.service';
import { StoresController } from './controllers/store/stores.controller';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import {
  Store,
  StoreSchema,
} from './infraestructure/database/mongo-db/schemas/store.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoresController],
  providers: [
    StoresService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
})
export class StoresModule {}
