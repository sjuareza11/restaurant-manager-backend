import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploaderService } from '@shared/domain/abstract/uplodader-service';
import { S3UploaderService } from '@src/shared/infraestructure/storage/s3-uploader/s3-uploader.service';
import { CategoriesService } from './application/categories.service';
import { CreateCategoryFactoryService } from './application/factories/create-category-factory.service';
import { CreateProductFactoryService } from './application/factories/create-product-factory.service';
import { UpdateCategoryFactoryService } from './application/factories/update-category-factory.service';
import { UpdateProductFactoryService } from './application/factories/update-product-factory.service';
import { MenusService } from './application/menus.service';
import { ProductsService } from './application/products.service';
import { CategoriesController } from './controllers/categories.controller';
import { MenusController } from './controllers/menus.controller';
import { ProductsController } from './controllers/products.controller';
import { DataService } from './domain/abstract/data-service.ts';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import { Category, CategorySchema } from './infraestructure/database/mongo-db/schemas/category.schema';
import { Menu, MenuSchema } from './infraestructure/database/mongo-db/schemas/menu.schema';
import { Product, ProductSchema } from './infraestructure/database/mongo-db/schemas/product.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Menu.name, schema: MenuSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [MenusController, CategoriesController, ProductsController],
  exports: [MenusService],
  providers: [
    MenusService,
    CategoriesService,
    ProductsService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
    {
      provide: UploaderService,
      useClass: S3UploaderService,
    },
    CreateCategoryFactoryService,
    UpdateCategoryFactoryService,
    CreateProductFactoryService,
    UpdateProductFactoryService,
  ],
})
export class MenusModule {}
