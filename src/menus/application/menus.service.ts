import { Injectable } from '@nestjs/common';
import { DataService } from '../domain/abstract/data-service.ts';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private dataService: DataService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.dataService.menus.create(createMenuDto);
  }

  findAllByStoreId(storeId: string) {
    return this.dataService.menus.getItemsByStoreId(storeId);
  }

  findOneByStoreId(id: string, storeId: string) {
    return this.dataService.menus.getItemByStoreId(id, storeId);
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.dataService.menus.update(id, updateMenuDto);
  }
  removeByStoreId(id: string, storeId: string) {
    return this.dataService.menus.deleteByStoreId(id, storeId);
  }
}
