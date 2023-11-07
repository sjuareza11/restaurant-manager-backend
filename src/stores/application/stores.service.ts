import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataService } from '@src/stores/domain/abstract/data-service';
import { StoreCreatedEvent } from './../../shared/domain/events/StoreCreatedEvent';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    private dataService: DataService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createStoreDto: CreateStoreDto, ownerId: string) {
    const store = await this.dataService.stores.create(createStoreDto);
    this.eventEmitter.emit(
      'new.store',
      new StoreCreatedEvent(store._id.toString(), ownerId),
    );
    return store;
  }

  findStoreByOrganizationId(id: string, organizationId: string) {
    return this.dataService.stores.getStoreByOrganizationId(id, organizationId);
  }

  updateStoreByOrganizationId(id: string, updateStoreDto: UpdateStoreDto) {
    if (
      this.dataService.stores.getStoreByOrganizationId(
        id,
        updateStoreDto.organizationId,
      )
    ) {
      return this.dataService.stores.update(id, updateStoreDto);
    }
  }
}
