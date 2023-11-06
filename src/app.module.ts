import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './config/env-config.module';
import { MONGO_CONFIG } from './config/infraestructure/env-mongo-config';

@Module({
  imports: [
    AuthModule,
    EnvConfigModule,
    MongooseModule.forRoot(
      `mongodb://${MONGO_CONFIG.user}:${MONGO_CONFIG.password}@${MONGO_CONFIG.host}:${MONGO_CONFIG.port}`,
      { dbName: MONGO_CONFIG.dbName },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
