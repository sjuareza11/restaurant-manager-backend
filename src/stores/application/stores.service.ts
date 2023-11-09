import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MenusService } from '@src/menus/application/menus.service';
import { DataService } from '@src/stores/domain/abstract/data-service';
import { StoreEntity } from '../domain/entities/store.entity';
import { StoreCreatedEvent } from './../../shared/domain/events/StoreCreatedEvent';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    private dataService: DataService,
    private menusService: MenusService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createStoreDto: CreateStoreDto, ownerId: string) {
    const store = await this.dataService.stores.create(createStoreDto);
    this.eventEmitter.emit('new.store', new StoreCreatedEvent(store._id.toString(), ownerId));
    return store;
  }

  findStoreByOrganizationId(id: string, organizationId: string) {
    return this.dataService.stores.getStoreByOrganizationId(id, organizationId);
  }

  async updateStoreByOrganizationId(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.dataService.stores.getStoreByOrganizationId(id, updateStoreDto.organizationId);
    if (store) {
      if (updateStoreDto.storeMenuServices.some((menuService) => menuService.menuId)) {
        const menusToAssign = await this.getMenusByStoreId({ ...updateStoreDto, _id: store._id });
        updateStoreDto.storeMenuServices = menusToAssign;
      }
      const storeUpdated = await this.dataService.stores.update(id, updateStoreDto);
      return storeUpdated;
    }
  }

  private async getMenusByStoreId(store: StoreEntity) {
    const storeMenus = await this.menusService.findAllByStoreId(store._id);
    return store.storeMenuServices
      .map((menuService) => {
        const menu = storeMenus.find((menu) => menu._id === menuService.menuId);
        return menu ? { ...menuService, menuId: menu._id, menuName: menu.name } : null;
      })
      .filter((item) => item !== null);
  }
}
