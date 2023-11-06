import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/users.module';
import { CryptoService } from '../shared/domain/abstract/crypto-service';
import { ArgonService } from './../shared/infraestructure/argon.service';
import { AuthService } from './application/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AccessTokenStrategy } from './infraestructure/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './infraestructure/strategies/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: CryptoService,
      useClass: ArgonService,
    },
  ],
})
export class AuthModule {}
