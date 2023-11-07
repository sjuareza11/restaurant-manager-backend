import { HasMimeType } from '@src/shared/application/validators/has-mime-type';
import { MaxFileSize } from '@src/shared/application/validators/max-file-size.validator';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCourierDto {
  @IsString()
  @MinLength(9)
  personalId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  surname: string;
  @IsString()
  @IsEmail()
  email;
  @IsString()
  @IsMobilePhone('es-ES')
  phone: string;
  @IsOptional()
  @IsBoolean()
  available?: boolean;
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  imageFile: any;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  // @IsUUID(UUID_VERSION)
  // storeId: string;
}
