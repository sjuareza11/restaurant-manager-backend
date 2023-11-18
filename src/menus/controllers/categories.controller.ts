import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from '@src/shared/domain/dto/pagination.dto';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { AddFilesToBodyInterceptor } from '@src/shared/infraestructure/interceptors/add-files-to-body.interceptor';
import { AddStoreIdInterceptor } from '@src/shared/infraestructure/interceptors/add-store-id.interceptor';
import { AuthStoreMemberGuard } from '@src/stores/application/guards/auth-store-member.guard';
import { CategoriesService } from '../application/categories.service';
import { CreateCategoryDto } from '../application/dto/create-category.dto';
import { UpdateCategoryDto } from '../application/dto/update-category.dto';
import { AddMenuIdInterceptor } from '../infraestructure/interceptors/add-menu-id.interceptor';

@Controller('stores/:storeId/menus/:menuId/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddFilesToBodyInterceptor, AddStoreIdInterceptor, AddMenuIdInterceptor)
  @Post()
  create(@Body() createMenuDto: CreateCategoryDto) {
    return this.categoriesService.create(createMenuDto);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get()
  findAll(@Req() req: any, @Param('menuId') menuId: string, @Query() paginationDto: PaginationDto) {
    const storeId: string = req.user['storeId'];
    return this.categoriesService.findAll({ storeId, menuId, pagination: paginationDto });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any, @Param('menuId') menuId: string) {
    const storeId: string = req.user['storeId'];
    return this.categoriesService.findOne(id, { storeId, menuId });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor, AddFilesToBodyInterceptor, AddMenuIdInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Param('menuId') menuId: string, @Body() updateMenuDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, new UpdateCategoryDto({ ...updateMenuDto, menuId }));
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('menuId') menuId: string, @Req() req: any) {
    const storeId: string = req.user['storeId'];
    return this.categoriesService.delete(id, { storeId, menuId });
  }
}
