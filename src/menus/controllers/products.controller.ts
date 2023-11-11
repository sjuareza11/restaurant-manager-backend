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
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { AddFilesToBodyInterceptor } from '@src/shared/infraestructure/interceptors/add-files-to-body.interceptor';
import { AddStoreIdInterceptor } from '@src/shared/infraestructure/interceptors/add-store-id.interceptor';
import { AuthStoreMemberGuard } from '@src/stores/application/guards/auth-store-member.guard';
import { CreateProductDto } from '../application/dto/create-product.dto';
import { ProductQueryParamsDto } from '../application/dto/product-query-params.dto';
import { UpdateProductDto } from '../application/dto/update-product.dto';
import { ProductsService } from '../application/products.service';
import { AddMenuIdInterceptor } from '../infraestructure/interceptors/add-menu-id.interceptor';

@Controller('stores/:storeId/menus/:menuId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddFilesToBodyInterceptor, AddStoreIdInterceptor, AddMenuIdInterceptor)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get()
  findAll(@Req() req: any, @Param('menuId') menuId: string, @Query() queryParams: ProductQueryParamsDto) {
    const { categoryId, ...secondarySearchCriteria } = queryParams;
    const storeId: string = req.user['storeId'];
    return !categoryId || categoryId.length === 0
      ? this.productsService.finAll({ storeId, menuId, pagination: secondarySearchCriteria })
      : this.productsService.findAllByCategoryId(queryParams.categoryId, {
          storeId,
          menuId,
          pagination: secondarySearchCriteria,
        });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any, @Param('menuId') menuId: string) {
    const storeId: string = req.user['storeId'];
    return this.productsService.findOne(id, { storeId, menuId });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor, AddFilesToBodyInterceptor, AddMenuIdInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Param('menuId') menuId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, { ...updateProductDto, menuId });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('menuId') menuId: string, @Req() req: any) {
    const storeId: string = req.user['storeId'];
    return this.productsService.delete(id, { storeId, menuId });
  }
}
