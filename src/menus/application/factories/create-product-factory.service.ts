import { Injectable } from '@nestjs/common';
import { ProductEntity } from '@src/menus/domain/entities/product.ts';
import { UrlFileCreator } from '@src/shared/application/utils/url-file-creator.ts';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { generateUUID } from '@src/shared/domain/utils/uuid';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductFactoryService implements BaseFactoryService<CreateProductDto, ProductEntity> {
  constructor() {}
  create(dto: CreateProductDto): ProductEntity {
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
      price: dto.price,
      categories: dto.categories,
    };
  }
}
