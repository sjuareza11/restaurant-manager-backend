import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationCreatedEvent } from '@src/shared/domain/events/organization-created.event';
import { UsersService } from '@users/application/users.service';

@Injectable()
export class UserEventsHandlerService {
  constructor(public userService: UsersService) {}
  @OnEvent('new.organization')
  assignOrganizationToUser(payload: OrganizationCreatedEvent) {
    this.userService.update(payload.userId, {
      organizationId: payload.organizationId,
    });
  }
}
