import { Injectable } from '@nestjs/common';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto.js';
import { DataService } from '../domain/abstract/data-service.ts';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private dataService: DataService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.dataService.menus.create(createMenuDto);
  }

  findAll(storeId: string, options?: QueryOptionsDto) {
    return this.dataService.menus.getItemsByStoreId(storeId, options);
  }

  findOne(id: string, storeId: string) {
    return this.dataService.menus.getItemByStoreId(id, storeId);
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.dataService.menus.update(id, updateMenuDto);
  }
  removeByStoreId(id: string, storeId: string) {
    return this.dataService.menus.deleteByStoreId(id, storeId);
  }
}
