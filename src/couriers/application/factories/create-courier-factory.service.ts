import { Injectable } from '@nestjs/common';
import { CourierEntity } from '@src/couriers/domain/entities/courier.entity';
import { UrlFileCreator } from '@src/shared/application/utils/url-file-creator.ts';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { CreateCourierDto } from '../dto/create-courier.dto';

@Injectable()
export class CreateCourierFactoryService implements BaseFactoryService<CreateCourierDto, CourierEntity> {
  constructor() {}
  create(dto: CreateCourierDto): CourierEntity {
    return {
      _id: generateUUID(),
      personalId: dto.personalId,
      name: dto.name,
      surname: dto.surname,
      phone: dto.phone,
      email: dto.email,
      available: dto.available,
      storeId: dto.storeId,
      imageUrl: dto.imageFile
        ? UrlFileCreator.createURLFile({
            storeId: dto.storeId,
            fileId: dto._id,
          })
        : undefined,
    };
  }
}
