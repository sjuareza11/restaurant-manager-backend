import { EnvironmentConfiguration } from '@config/domain/environment-configuration';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig } from '@src/config/domain/auth-config';
import { CryptoService } from '@src/shared/domain/abstract/crypto-service';
import { CreateUserDto } from '@users/application/dto/create-user.dto';
import { UsersService } from '@users/application/users.service';
import { AuthDto } from './dto/auth-dto';
import { GenerateTokenParams } from './interfaces/generate-token-params';

@Injectable()
export class AuthService {
  private authEnviroment: AuthConfig = this.configService.get('authConfig');

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentConfiguration>,
    private cryptoService: CryptoService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('UserAlreadyExists');
    }

    // Hash password
    const hash = await this.cryptoService.hash(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens({
      userId: newUser._id,
      email: newUser.email,
      organizationId: newUser.organizationId,
      storeId: newUser.storeId,
    });
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException('IncorrectCredentials');
    const passwordMatches = await this.cryptoService.compare(data.password, user.password);
    if (!passwordMatches) throw new BadRequestException('IncorrectCredentials');
    const tokens = await this.getTokens({
      userId: user._id,
      email: user.email,
      organizationId: user.organizationId,
      storeId: user.storeId,
    });
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.cryptoService.hash(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(params: GenerateTokenParams) {
    const { userId, ...userData } = params;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          ...userData,
        },
        {
          secret: this.authEnviroment.jwtSecret,
          expiresIn: this.authEnviroment.jwtExpirationTime,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          userData,
        },
        {
          secret: this.authEnviroment.jwtRefreshSecret,
          expiresIn: this.authEnviroment.jwtRefreshExpirationTime,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('AccessDenied');
    const refreshTokenMatches = await this.cryptoService.compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('AccessDenied');
    const tokens = await this.getTokens({
      userId: user._id,
      email: user.email,
      organizationId: user.organizationId,
      storeId: user.storeId,
    });
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  validateApiKey(apiKey: string) {
    const apiKeys: string[] = this.authEnviroment.apiKey.split(',') || [];
    return apiKeys.find((key) => apiKey == key);
  }
}
