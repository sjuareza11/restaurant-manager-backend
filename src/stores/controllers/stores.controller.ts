import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenGuard } from '@shared/infraestructure/guards/access-token.guard';
import { AddOrganizationIdInterceptor } from '@src/shared/infraestructure/interceptors/add-organization-id.interceptor';
import { CreateStoreDto } from '../application/dto/create-store.dto';
import { UpdateStoreDto } from '../application/dto/update-store.dto';
import { StoresService } from '../application/stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AddOrganizationIdInterceptor)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @Req() req: any) {
    const userId = req.user['sub'];

    return this.storesService.create(createStoreDto, userId);
  }
  @UseGuards(AccessTokenGuard)
  @Get(':storeId')
  findOne(@Param('storeId') storeId: string, @Req() req: any) {
    const organizationId = req.user['organizationId'];

    return this.storesService.findStoreByOrganizationId(storeId, organizationId);
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AddOrganizationIdInterceptor)
  @Patch(':storeId')
  update(@Param('storeId') storeId: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStoreByOrganizationId(storeId, updateStoreDto);
  }
}
