import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DataService } from '@users/domain/abstract/data-service';
import { OrganizationCreatedEvent } from './../../shared/domain/events/organization-created.event';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataService: DataService) {}

  @OnEvent('new.organization')
  async notifyUser(payload: OrganizationCreatedEvent) {
    const user = await this.update(payload.userId, {
      organizationId: payload.organizationId,
    });
  }
  create(createUserDto: CreateUserDto) {
    return this.dataService.users.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findById(id: string) {
    return this.dataService.users.getById(id);
  }

  findByEmail(email: string) {
    return this.dataService.users.getByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.dataService.users.update(id, updateUserDto);
  }

  remove(id: string) {
    return `Remove endpoint not available`;
    // return  this.dataService.users.(email);;
  }
}
