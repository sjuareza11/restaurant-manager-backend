import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataService } from '@src/menus/domain/abstract/data-service.ts';
import { MenuRepository } from '@src/menus/domain/abstract/menu-repository';
import { Model } from 'mongoose';
import { MongoMenuRepository } from './repositories/mongo-menu.repository';
import { Menu } from './schemas/menu.schema';

@Injectable()
export class MongoDataService implements DataService {
  menus: MenuRepository<Menu>;
  constructor(
    @InjectModel(Menu.name)
    private MenuRepository: Model<Menu>,
  ) {}

  onApplicationBootstrap() {
    this.menus = new MongoMenuRepository<Menu>(this.MenuRepository);
  }
}
