import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfigBuilder } from './infraestructure/env-config-builder';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfigBuilder],
    }),
  ],
})
export class EnvConfigModule {}
