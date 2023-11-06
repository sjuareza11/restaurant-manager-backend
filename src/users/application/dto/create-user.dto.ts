import {
  IsEmail,
  IsMobilePhone,
  IsMongoId,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @IsMongoId()
  organizationId: string;
}
