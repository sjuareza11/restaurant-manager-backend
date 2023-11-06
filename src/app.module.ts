import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter'; //new
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './config/env-config.module';
import { MONGO_CONFIG } from './config/infraestructure/env-mongo-config';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    EnvConfigModule,
    MongooseModule.forRoot(
      `mongodb://${MONGO_CONFIG.user}:${MONGO_CONFIG.password}@${MONGO_CONFIG.host}:${MONGO_CONFIG.port}`,
      { dbName: MONGO_CONFIG.dbName },
    ),
    UsersModule,
    OrganizationsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
