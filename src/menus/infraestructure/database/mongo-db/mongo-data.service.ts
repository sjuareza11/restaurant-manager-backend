import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryRepository } from '@src/menus/domain/abstract/category.repository';
import { DataService } from '@src/menus/domain/abstract/data-service.ts';
import { MenuRepository } from '@src/menus/domain/abstract/menu-repository';
import { Model } from 'mongoose';
import { MongoCategoryRepository } from './repositories/mongo-category.repository';
import { MongoMenuRepository } from './repositories/mongo-menu.repository';
import { Category } from './schemas/category.schema';
import { Menu } from './schemas/menu.schema';

@Injectable()
export class MongoDataService implements DataService {
  menus: MenuRepository<Menu>;
  categories: CategoryRepository<Category>;
  constructor(
    @InjectModel(Menu.name)
    private MenuRepository: Model<Menu>,
    @InjectModel(Category.name)
    private CategoryRepository: Model<Category>,
  ) {}

  onApplicationBootstrap() {
    this.menus = new MongoMenuRepository<Menu>(this.MenuRepository);
    this.categories = new MongoCategoryRepository<Category>(this.CategoryRepository);
  }
}
