import { Injectable } from '@nestjs/common';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { DataService } from '../domain/abstract/data-service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Injectable()
export class CouriersService {
  constructor(
    private dataService: DataService,
    private uploaderService: UploaderService,
  ) {}

  create(createCourierDto: CreateCourierDto) {
    return this.uploaderService.uploadFile(createCourierDto.imageFile);
    // return this.dataService.couriers.create(createCourierDto);
  }

  findAllByStoreId(storeId: string) {
    return this.dataService.couriers.getItemsByStoreId(storeId);
  }

  findOneByStoreId(id: string, storeId: string) {
    return this.dataService.couriers.getItemByStoreId(id, storeId);
  }

  update(id: string, updateCourierDto: UpdateCourierDto) {
    return this.dataService.couriers.update(id, updateCourierDto);
  }

  removeByStoreId(id: string, storeId: string) {
    return this.dataService.couriers.deleteByStoreId(id, storeId);
  }
}
