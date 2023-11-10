import { CategoryEntity } from '../entities/category.entity';
import { MenuEntity } from '../entities/menu.entity';
import { ProductEntity } from '../entities/product.ts';
import { CategoryRepository } from './category.repository';
import { MenuRepository } from './menu-repository';
import { ProductRepository } from './product.repository';

export abstract class DataService {
  abstract menus: MenuRepository<Partial<MenuEntity>>;
  abstract categories: CategoryRepository<Partial<CategoryEntity>>;
  abstract products: ProductRepository<Partial<ProductEntity>>;
}
