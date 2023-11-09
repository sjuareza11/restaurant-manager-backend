import { CourierEntity } from '@src/couriers/domain/entities/courier.entity';
import { HasMimeType } from '@src/shared/application/validators/has-mime-type';
import { IsDNIOrCIF } from '@src/shared/application/validators/is-dni-or-cif';
import { IsFile } from '@src/shared/application/validators/is-file.validator';
import { MaxFileSize } from '@src/shared/application/validators/max-file-size.validator';
import { UploadFile } from '@src/shared/domain/models/upload-file';
import { UUID_VERSION, generateUUID } from '@src/shared/domain/utils/uuid';
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
import { CourierUrlFileCreator } from '../utils/url-file-creator.ts';

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
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;

  constructor(partial: Partial<CreateCourierDto>) {
    Object.assign(this, partial);
  }

  toEntity(): Partial<CourierEntity> {
    this._id = this._id ? this._id : generateUUID();
    const dto = new CreateCourierDto(this);
    const { imageFile, ...rest } = dto;
    return {
      ...rest,
      imageUrl: this.imageFile
        ? CourierUrlFileCreator.createImageURL({
            storeId: dto.storeId,
            fileId: dto._id,
            fileName: dto.name,
          })
        : undefined,
    };
  }
}
