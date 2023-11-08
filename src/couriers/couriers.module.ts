import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { S3UploaderService } from '@src/shared/infraestructure/storage/s3-uploader/s3-uploader.service';
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
    {
      provide: UploaderService,
      useClass: S3UploaderService,
    },
  ],
})
export class CouriersModule {}
