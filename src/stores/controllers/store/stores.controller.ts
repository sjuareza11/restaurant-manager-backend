import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccessTokenGuard } from '@shared/infraestructure/guards/access-token.guard';
import { AddOrganizationIdInterceptor } from '@src/shared/infraestructure/interceptors/add-organization-id/add-organization-id.interceptor';
import { CreateStoreDto } from './../../application/dto/create-store.dto';
import { UpdateStoreDto } from './../../application/dto/update-store.dto';
import { StoresService } from './../../application/stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storesService: StoresService) {}

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AddOrganizationIdInterceptor)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const organizationId = req.user['organizationId'];

    return this.storesService.findStoreByOrganizationId(id, organizationId);
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(AddOrganizationIdInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.updateStoreByOrganizationId(id, updateStoreDto);
  }
}
