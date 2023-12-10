import { Injectable } from '@nestjs/common';
import { ProductEntity } from '@src/menus/domain/entities/product.ts';
import { UrlFileCreator } from '@src/shared/application/utils/url-file-creator.ts';
import { BaseFactoryService } from '@src/shared/domain/abstract/base-factory.service';
import { UpdateProductDto } from './../dto/update-product.dto';

@Injectable()
export class UpdateProductFactoryService implements BaseFactoryService<UpdateProductDto, ProductEntity> {
  constructor() {}
  create(dto: UpdateProductDto): ProductEntity {
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
      price: dto.price,
      categories: dto.categories,
    };
  }
}
