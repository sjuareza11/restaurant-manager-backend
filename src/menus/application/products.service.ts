import { Injectable } from '@nestjs/common';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { FileDto } from '@src/shared/domain/dto/file.dto';
import { DataService } from '../domain/abstract/data-service.ts.js';
import { MenuItemsSearchCriteria } from '../domain/models/menu-items-search-criteria.js';
import { CategoriesService } from './categories.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    private dataService: DataService,
    private uploaderService: UploaderService,
    private categoriesService: CategoriesService,
  ) {}

  finAll(searchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.products.getAllItemsByStoreAndMenu(searchCriteria);
  }

  findOne(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.products.getItemByIdInStoreAndMenu(id, secondarySearchCriteria);
  }

  findAllByCategoryId(categoryId: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.products.findAllProductsByCategoryId(categoryId, secondarySearchCriteria);
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.dataService.products.createItemInStoreAndMenu({
      ...createProductDto.toEntity(),
    });
    if (newProduct && createProductDto.imageFile) {
      const response = await this.uploaderService.uploadFile(
        new FileDto({
          ...createProductDto.imageFile,
          fullPath: newProduct.imageUrl,
        }),
      );
    }

    return newProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.dataService.products.updateItemInStoreAndMenu(id, updateProductDto);
    if (product && updateProductDto.imageFile) {
      return await this.uploaderService.uploadFile(
        new FileDto({
          ...updateProductDto.imageFile,
          fullPath: product.imageUrl,
        }),
      );
    }
    return product;
  }

  delete(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.products.deleteItemInStoreAndMenu(id, secondarySearchCriteria);
  }
}
