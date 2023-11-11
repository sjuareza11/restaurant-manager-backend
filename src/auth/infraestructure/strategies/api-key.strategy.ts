import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@src/auth/application/auth.service';
import { AuthConfig } from '@src/config/domain/auth-config';
import { EnvironmentConfiguration } from '@src/config/domain/environment-configuration';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(
    private authService: AuthService,
    configService: ConfigService<EnvironmentConfiguration>,
  ) {
    const headerKeyApiKey = configService.get<AuthConfig>('authConfig').headerKeyApiKey || '';
    super({ header: headerKeyApiKey, prefix: '' }, true, async (apiKey, done) => {
      if (this.authService.validateApiKey(apiKey)) {
        done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
