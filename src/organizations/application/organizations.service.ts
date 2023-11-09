import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrganizationCreatedEvent } from '@shared/domain/events/organization-created.event';
import { DataService } from '../domain/abstract/data-service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
@Injectable()
export class OrganizationsService {
  constructor(
    private dataService: DataService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = await this.dataService.organizations.create(createOrganizationDto);
    this.eventEmitter.emit(
      'new.organization',
      new OrganizationCreatedEvent(organization._id, createOrganizationDto.ownerId),
    );
    return organization;
  }

  findOne(id: string) {
    return this.dataService.organizations.getById(id);
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.dataService.organizations.update(id, updateOrganizationDto);
  }
}
