import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@src/menus/domain/entities/category.entity';
import { UrlFileCreator } from '@src/shared/application/utils/url-file-creator.ts';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { UpdateCategoryDto } from './../dto/update-category.dto';

@Injectable()
export class UpdateCategoryFactoryService implements BaseFactoryService<UpdateCategoryDto, CategoryEntity> {
  constructor() {}
  create(dto: UpdateCategoryDto): CategoryEntity {
    return {
      _id: dto._id,
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
        : dto.imageUrl,
      order: dto.order,
    };
  }
}
