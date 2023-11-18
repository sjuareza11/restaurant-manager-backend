import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAll(searchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.categories.getAllItemsByStoreAndMenu(searchCriteria);
  }

  findOne(id: string, secondarySearchCriteria: MenuItemsSearchCriteria) {
    return this.dataService.categories.getItemByIdInStoreAndMenu(id, secondarySearchCriteria);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryByCode = await this.dataService.categories.getItemByCode(createCategoryDto.code, {
      storeId: createCategoryDto.storeId,
      menuId: createCategoryDto.menuId,
    });
    if (categoryByCode) {
      throw new BadRequestException('categoryCodeAlreadyExists');
    }
    const newCategory = await this.dataService.categories.createItemInStoreAndMenu({
      ...createCategoryDto.toEntity(),
    });
    if (newCategory && createCategoryDto.imageFile) {
      await this.uploaderService.uploadFile(
        new FileDto({
          ...createCategoryDto.imageFile,
          fullPath: newCategory.imageUrl,
        }),
      );
    }
    return newCategory;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryByCode = await this.dataService.categories.getItemByCode(updateCategoryDto.code, {
      storeId: updateCategoryDto.storeId,
      menuId: updateCategoryDto.menuId,
    });
    if (categoryByCode && categoryByCode._id !== id) {
      throw new BadRequestException('categoryCodeAlreadyExists');
    }
    const category = await this.dataService.categories.updateItemInStoreAndMenu(id, updateCategoryDto.toEntity());
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
}
