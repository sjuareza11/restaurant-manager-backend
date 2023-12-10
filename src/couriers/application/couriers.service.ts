import { BadRequestException, Injectable } from '@nestjs/common';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { FileDto } from '@src/shared/domain/dto/file.dto';
import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';
import { DataService } from '../domain/abstract/data-service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { CreateCourierFactoryService } from './factories/create-courier-factory.service';
import { UpdateCourierFactoryService } from './factories/update-courier-factory.service';

@Injectable()
export class CouriersService {
  constructor(
    private dataService: DataService,
    private uploaderService: UploaderService,
    private createCourierFactoryService: CreateCourierFactoryService,
    private updateCourierFactoryService: UpdateCourierFactoryService,
  ) {}

  async create(createCourierDto: CreateCourierDto) {
    const courierByCode = await this.dataService.couriers.getItemByCriteria({
      personalId: createCourierDto.personalId,
      storeId: createCourierDto.storeId,
    });
    const courierByEmail = await this.dataService.couriers.getItemByCriteria({
      email: createCourierDto.email,
      storeId: createCourierDto.storeId,
    });

    if (courierByCode) {
      throw new BadRequestException('errorCourierPersonalIdAlreadyExist');
    } else if (courierByEmail) {
      throw new BadRequestException('errorCourierEmailAlreadyExist');
    }
    const courierToInsert = this.createCourierFactoryService.create(createCourierDto);
    const courier = await this.dataService.couriers.create(courierToInsert);
    if (courier && createCourierDto.imageFile) {
      await this.uploaderService.uploadFile(new FileDto({ ...createCourierDto.imageFile, fullPath: courier.imageUrl }));
    }
    return courier;
  }

  findAll(storeId: string, options?: QueryOptionsDto) {
    return this.dataService.couriers.getItemsByStoreId(storeId, options);
  }

  findOne(id: string, storeId: string) {
    return this.dataService.couriers.getItemByStoreId(id, storeId);
  }

  async update(id: string, updateCourierDto: UpdateCourierDto) {
    const courierByCode = await this.dataService.couriers.getItemByCriteria({
      personalId: updateCourierDto.personalId,
      storeId: updateCourierDto.storeId,
    });
    const courierByEmail = await this.dataService.couriers.getItemByCriteria({
      email: updateCourierDto.email,
      storeId: updateCourierDto.storeId,
    });

    if (courierByCode && courierByCode._id !== id) {
      throw new BadRequestException('errorCourierPersonalIdAlreadyExist');
    } else if (courierByEmail && courierByEmail.email !== updateCourierDto.email) {
      throw new BadRequestException('errorCourierEmailAlreadyExist');
    }
    const courierToUpdate = this.updateCourierFactoryService.create(updateCourierDto);
    const courier = await this.dataService.couriers.update(id, courierToUpdate);
    if (courier && updateCourierDto.imageFile) {
      await this.uploaderService.uploadFile(new FileDto({ ...updateCourierDto.imageFile, fullPath: courier.imageUrl }));
    }
    return courier;
  }

  remove(id: string, storeId: string) {
    return this.dataService.couriers.deleteByStoreId(id, storeId);
  }
}
