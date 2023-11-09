import { MenuEntity } from '../entities/menu.entity';
import { MenuRepository } from './menu-repository';

export abstract class DataService {
  abstract menus: MenuRepository<Partial<MenuEntity>>;
}
