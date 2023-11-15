import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@src/shared/infraestructure/guards/access-token.guard';
import { UpdateUserDto } from './application/dto/update-user.dto';
import { AccessUserDetailsGuard } from './application/guards/access-user-details/access-user-details.guard';
import { UserEventsHandlerService } from './application/user-events-handler/user-events-handler.service';
import { UsersService } from './application/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userEventsHandlerService: UserEventsHandlerService,
  ) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  @UseGuards(AccessTokenGuard, AccessUserDetailsGuard)
  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.usersService.findById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}
