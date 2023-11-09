import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploaderService } from '@shared/domain/abstract/uplodader-service';
import { S3UploaderService } from '@src/shared/infraestructure/storage/s3-uploader/s3-uploader.service';
import { CategoriesService } from './application/categories.service';
import { MenusService } from './application/menus.service';
import { CategoriesController } from './controllers/categories.controller';
import { MenusController } from './controllers/menus.controller';
import { DataService } from './domain/abstract/data-service.ts';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import { Category, CategorySchema } from './infraestructure/database/mongo-db/schemas/category.schema';
import { Menu, MenuSchema } from './infraestructure/database/mongo-db/schemas/menu.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Menu.name, schema: MenuSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [MenusController, CategoriesController],
  exports: [MenusService],
  providers: [
    MenusService,
    CategoriesService,
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
export class MenusModule {}
