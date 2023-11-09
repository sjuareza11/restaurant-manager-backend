import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { CreateOrganizationDto } from '../application/dto/create-organization.dto';
import { UpdateOrganizationDto } from '../application/dto/update-organization.dto';
import { OrganizationIsMemberGuard } from '../application/guards/organization-is-member-guard';
import { OrganizationsService } from '../application/organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() body, @Req() req: any) {
    const userId = req.user['sub'];
    const createOrganizationDto: CreateOrganizationDto = {
      ...body,
      ownerId: userId,
    };
    return this.organizationsService.create(createOrganizationDto);
  }
  @UseGuards(AccessTokenGuard, OrganizationIsMemberGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard, OrganizationIsMemberGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }
}
