import { Injectable } from '@nestjs/common';
import { UploaderService } from '@src/shared/domain/abstract/uplodader-service';
import { FileDto } from '@src/shared/domain/dto/file.dto';
import { DataService } from '../domain/abstract/data-service.ts';
import { MenuItemsSearchCriteria } from '../domain/models/menu-items-search-criteria';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private dataService: DataService,
    private uploaderService: UploaderService,
  ) {}

  finAllCategoriesByStoreAndMenu(searchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.categories.getAllItemsByStoreAndMenu(searchCriteria);
  }

  findCategoryInStoreAndMenu(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.categories.getItemByIdInStoreAndMenu(id, secondarySearchCriteria);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.dataService.categories.createItemInStoreAndMenu({
      ...createCategoryDto.toEntity(),
    });
    if (newCategory && createCategoryDto.imageFile) {
      const response = await this.uploaderService.uploadFile(
        new FileDto({
          ...createCategoryDto.imageFile,
          fullPath: newCategory.imageUrl,
        }),
      );
      return newCategory;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.dataService.categories.updateItemInStoreAndMenu(id, updateCategoryDto);
    if (category && updateCategoryDto.imageFile) {
      return await this.uploaderService.uploadFile(
        new FileDto({
          ...updateCategoryDto.imageFile,
          fullPath: category.imageUrl,
        }),
      );
    }
    return category;
  }

  delete(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.categories.deleteItemInStoreAndMenu(id, secondarySearchCriteria);
  }

  getAllProductsFromCategoryInContext(categoryId: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.categories.getAllProductsFromCategoryInContext(categoryId, secondarySearchCriteria);
  }
}
