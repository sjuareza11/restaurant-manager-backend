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
import { CreateMenuDto } from '../application/dto/create-menu.dto';
import { UpdateMenuDto } from '../application/dto/update-menu.dto';
import { MenusService } from '../application/menus.service';

@Controller('stores/:storeId/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddFilesToBodyInterceptor, AddStoreIdInterceptor)
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get()
  findAll(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const storeId = req.user['storeId'];
    return this.menusService.findAll(storeId, { pagination: paginationDto });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.menusService.findOne(id, storeId);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor, AddFilesToBodyInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.menusService.removeByStoreId(id, storeId);
  }
}
