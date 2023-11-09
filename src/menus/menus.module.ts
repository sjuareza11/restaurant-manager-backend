import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MenusService } from './application/menus.service';
import { MenusController } from './controllers/menus.controller';
import { DataService } from './domain/abstract/data-service.ts';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import {
  Menu,
  MenuSchema,
} from './infraestructure/database/mongo-db/schemas/menu.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  controllers: [MenusController],
  providers: [
    MenusService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
})
export class MenusModule {}
