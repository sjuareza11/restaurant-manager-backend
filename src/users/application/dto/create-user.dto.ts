import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  surname: string;
  @IsString()
  @IsMobilePhone('es-ES')
  phone: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
  @IsEmail()
  email: string;
  refreshToken: string;
  @IsOptional()
  @IsUUID(UUID_VERSION)
  organizationId: string;
  @IsOptional()
  @IsUUID(UUID_VERSION)
  storeId: string;
  @IsBoolean()
  legalTermsAndConditions: boolean;
}
