import { BadRequestException, Injectable } from '@nestjs/common';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { FileDto } from '@src/shared/domain/dto/file.dto';
import { DataService } from '../domain/abstract/data-service.ts.js';
import { MenuItemsSearchCriteria } from '../domain/models/menu-items-search-criteria.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { CreateProductFactoryService } from './factories/create-product-factory.service';
import { UpdateProductFactoryService } from './factories/update-product-factory.service.js';

@Injectable()
export class ProductsService {
  constructor(
    private dataService: DataService,
    private uploaderService: UploaderService,
    private createProductFactoryService: CreateProductFactoryService,
    private updateProductFactoryService: UpdateProductFactoryService,
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
    const productByCode = await this.dataService.categories.getItemByCode(createProductDto.code, {
      storeId: createProductDto.storeId,
      menuId: createProductDto.menuId,
    });
    if (productByCode) {
      throw new BadRequestException('categoryCodeAlreadyExists');
    }
    const productToInsert = this.createProductFactoryService.create(createProductDto);
    const newProduct = await this.dataService.products.createItemInStoreAndMenu(productToInsert);
    if (newProduct && createProductDto.imageFile) {
      await this.uploaderService.uploadFile(
        new FileDto({ ...createProductDto.imageFile, fullPath: newProduct.imageUrl }),
      );
    }

    return newProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productByCode = await this.dataService.categories.getItemByCode(updateProductDto.code, {
      storeId: updateProductDto.storeId,
      menuId: updateProductDto.menuId,
    });
    if (productByCode && productByCode._id !== id) {
      throw new BadRequestException('productCodeAlreadyExists');
    }
    const productToUpdate = this.createProductFactoryService.create(updateProductDto);
    const product = await this.dataService.products.updateItemInStoreAndMenu(id, productToUpdate);
    if (product && updateProductDto.imageFile) {
      await this.uploaderService.uploadFile(new FileDto({ ...updateProductDto.imageFile, fullPath: product.imageUrl }));
    }
    return product;
  }

  delete(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.products.deleteItemInStoreAndMenu(id, secondarySearchCriteria);
  }
}
