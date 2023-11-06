import { Injectable } from '@nestjs/common';
import { DataService } from '@src/stores/domain/abstract/data-service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private dataService: DataService) {}

  async create(createStoreDto: CreateStoreDto) {
    const store = await this.dataService.stores.create(createStoreDto);
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
