import { CategoryEntity } from '../entities/category.entity';
import { MenuEntity } from '../entities/menu.entity';
import { CategoryRepository } from './category.repository';
import { MenuRepository } from './menu-repository';

export abstract class DataService {
  abstract menus: MenuRepository<Partial<MenuEntity>>;
  abstract categories: CategoryRepository<Partial<CategoryEntity>>;
}
