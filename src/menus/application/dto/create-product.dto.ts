import { ProductEntity } from '@src/menus/domain/entities/product.ts';
import { UrlFileCreator } from '@src/shared/application/utils/url-file-creator.ts';
import { HasMimeType } from '@src/shared/application/validators/has-mime-type';
import { IsFile } from '@src/shared/application/validators/is-file.validator';
import { MaxFileSize } from '@src/shared/application/validators/max-file-size.validator';
import { UploadFile } from '@src/shared/domain/models/upload-file';
import { UUID_VERSION, generateUUID } from '@src/shared/domain/utils/uuid';
import { FileUtils } from '@src/shared/utils/file.utils';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  MinLength,
  NotContains,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
  @IsUUID(UUID_VERSION)
  menuId: string;
  @IsOptional()
  @IsArray()
  @IsUUID(UUID_VERSION, { each: true })
  categories: string[];
  @IsString()
  @MinLength(1)
  name: string;
  @IsOptional()
  @IsString()
  description: string;
  @NotContains(' ')
  @IsString()
  @Length(3, 20)
  code: string;
  @IsNumber()
  @IsPositive()
  price: number;
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

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }

  toEntity(): Partial<ProductEntity> {
    this._id = this._id ? this._id : generateUUID();
    const dto = new CreateProductDto(this);
    const { imageFile, ...rest } = dto;
    return {
      ...rest,
      imageUrl: this.imageFile
        ? UrlFileCreator.createURLFile({
            storeId: dto.storeId,
            fileId: dto._id,
          })
        : undefined,
    };
  }
}
