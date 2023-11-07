import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEventsHandlerService } from './application/user-events-handler/user-events-handler.service';
import { UsersService } from './application/users.service';
import { DataService } from './domain/abstract/data-service';
import { MongoDataService } from './infraestructure/database/mongo-db/mongo-data.service';
import {
  User,
  UserSchema,
} from './infraestructure/database/mongo-db/schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserEventsHandlerService,
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
})
export class UsersModule {}
