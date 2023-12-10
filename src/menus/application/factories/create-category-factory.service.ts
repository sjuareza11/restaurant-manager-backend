import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@src/menus/domain/entities/category.entity';
import { UrlFileCreator } from '@src/shared/application/utils/url-file-creator.ts';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CreateCategoryFactoryService implements BaseFactoryService<CreateCategoryDto, CategoryEntity> {
  constructor() {}
  create(dto: CreateCategoryDto): CategoryEntity {
    return {
      _id: generateUUID(),
      name: dto.name,
      description: dto.description,
      code: dto.code,
      available: dto.available,
      menuId: dto.menuId,
      storeId: dto.storeId,
      imageUrl: dto.imageFile
        ? UrlFileCreator.createURLFile({
            storeId: dto.storeId,
            fileId: dto._id,
          })
        : undefined,
      order: dto.order,
    };
  }
}
