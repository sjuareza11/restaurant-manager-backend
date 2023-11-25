import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter'; //new
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { envConfigBuilder } from './config/infraestructure/env-config-builder';
import { CouriersModule } from './couriers/couriers.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfigBuilder],
    }),
    AuthModule,
    MongooseModule.forRoot(
      `${process.env.MONGODB_PROTOCOL}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`,
      { dbName: process.env.MONGODB_NAME },
    ),
    UsersModule,
    OrganizationsModule,
    StoresModule,
    EventEmitterModule.forRoot(),
    CouriersModule,
    MenusModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
