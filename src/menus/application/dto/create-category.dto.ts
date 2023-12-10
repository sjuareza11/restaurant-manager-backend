import { HasMimeType } from '@src/shared/application/validators/has-mime-type';
import { IsFile } from '@src/shared/application/validators/is-file.validator';
import { MaxFileSize } from '@src/shared/application/validators/max-file-size.validator';
import { UploadFile } from '@src/shared/domain/models/upload-file';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { FileUtils } from '@src/shared/utils/file.utils';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Length, MinLength, NotContains } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
  @IsUUID(UUID_VERSION)
  menuId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsOptional()
  description: string;
  @NotContains(' ')
  @IsString()
  @Length(3, 20)
  code: string;
  @IsOptional()
  @IsInt()
  order: number;
  @IsOptional()
  @IsBoolean()
  available: boolean;
  @IsOptional()
  @IsFile()
  @MaxFileSize(FileUtils.convertMBytesToBytes(20))
  @HasMimeType(['image/jpeg', 'image/png'])
  imageFile?: UploadFile;
  @IsOptional()
  @IsString()
  imageUrl?: string;

  constructor(partial: Partial<CreateCategoryDto>) {
    Object.assign(this, partial);
  }
}
