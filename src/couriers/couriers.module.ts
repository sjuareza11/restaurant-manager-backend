import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { S3UploaderService } from '@src/shared/infraestructure/storage/s3-uploader/s3-uploader.service';
import { CouriersService } from './application/couriers.service';
import { CreateCourierFactoryService } from './application/factories/create-courier-factory.service';
import { UpdateCourierFactoryService } from './application/factories/update-courier-factory.service';
import { CouriersController } from './controllers/couriers.controller';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import { Courier, CourierSchema } from './infraestructure/database/mongo-db/schemas/courier.schema';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: Courier.name, schema: CourierSchema }])],
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
    CreateCourierFactoryService,
    UpdateCourierFactoryService,
  ],
})
export class CouriersModule {}
