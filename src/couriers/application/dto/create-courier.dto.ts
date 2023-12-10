import { HasMimeType } from '@src/shared/application/validators/has-mime-type';
import { IsDNIOrCIF } from '@src/shared/application/validators/is-dni-or-cif';
import { IsFile } from '@src/shared/application/validators/is-file.validator';
import { MaxFileSize } from '@src/shared/application/validators/max-file-size.validator';
import { UploadFile } from '@src/shared/domain/models/upload-file';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { FileUtils } from '@src/shared/utils/file.utils';
import { IsBoolean, IsEmail, IsMobilePhone, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCourierDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsString()
  @IsDNIOrCIF()
  personalId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsOptional()
  @IsString()
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
  @IsOptional()
  @IsFile()
  @MaxFileSize(FileUtils.convertMBytesToBytes(20))
  @HasMimeType(['image/jpeg', 'image/png'])
  imageFile?: UploadFile;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsUUID(UUID_VERSION)
  storeId: string;

  constructor(partial: Partial<CreateCourierDto>) {
    Object.assign(this, partial);
  }
}
