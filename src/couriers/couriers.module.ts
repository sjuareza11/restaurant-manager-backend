import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouriersService } from './application/couriers.service';
import { CouriersController } from './controllers/couriers.controller';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import {
  Courier,
  CourierSchema,
} from './infraestructure/database/mongo-db/schemas/courier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Courier.name, schema: CourierSchema }]),
  ],
  controllers: [CouriersController],
  providers: [
    CouriersService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
})
export class CouriersModule {}
