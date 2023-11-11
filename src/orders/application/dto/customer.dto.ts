import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsEmail, IsMobilePhone, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CustomerDto {
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsUUID(UUID_VERSION)
  organizationId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  surname: string;
  @IsString()
  @IsMobilePhone('es-ES')
  phone: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}
