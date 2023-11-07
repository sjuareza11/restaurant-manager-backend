import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrganizationCreatedEvent } from '@src/shared/domain/events/organization-created.event';
import { UsersService } from '@users/application/users.service';
import { StoreCreatedEvent } from './../../../shared/domain/events/StoreCreatedEvent';
@Injectable()
export class UserEventsHandlerService {
  constructor(public userService: UsersService) {}
  @OnEvent('new.organization')
  async assignOrganizationToUser(payload: OrganizationCreatedEvent) {
    const user = await this.userService.update(payload.userId, {
      organizationId: payload.organizationId,
    });
  }

  @OnEvent('new.store')
  async assigStoreToUser(payload: StoreCreatedEvent) {
    await this.userService.update(payload.userId, {
      storeId: payload.storeId,
    });
  }
}
