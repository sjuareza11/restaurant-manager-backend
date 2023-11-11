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
import { CouriersService } from '../application/couriers.service';
import { CreateCourierDto } from '../application/dto/create-courier.dto';
import { UpdateCourierDto } from '../application/dto/update-courier.dto';

@Controller('stores/:storeId/couriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddFilesToBodyInterceptor, AddStoreIdInterceptor)
  @Post()
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.couriersService.create(createCourierDto);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get()
  findAll(@Req() req: any, @Query() paginationDto: PaginationDto) {
    const storeId = req.user['storeId'];
    return this.couriersService.findAll(storeId, { pagination: paginationDto });
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.couriersService.findOne(id, storeId);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor, AddFilesToBodyInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return this.couriersService.update(id, updateCourierDto);
  }

  @UseGuards(AccessTokenGuard, AuthStoreMemberGuard)
  @UseInterceptors(AddStoreIdInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const storeId = req.user['storeId'];
    return this.couriersService.remove(id, storeId);
  }
}
