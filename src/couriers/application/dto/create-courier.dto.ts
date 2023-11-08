import { HasMimeType } from '@src/shared/application/validators/has-mime-type';
import { IsDNIOrCIF } from '@src/shared/application/validators/is-dni-or-cif';
import { MaxFileSize } from '@src/shared/application/validators/max-file-size.validator';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { FileUtils } from '@src/shared/utils/file.utils';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCourierDto {
  @IsString()
  @IsDNIOrCIF()
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
  @MaxFileSize(FileUtils.convertMBytesToBytes(20))
  @HasMimeType(['image/jpeg', 'image/png'])
  imageFile: any;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
}
