import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsBoolean, IsOptional, IsString, IsUUID, Length, MinLength, NotContains } from 'class-validator';

export class CreateMenuDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
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
  @IsOptional()
  @IsBoolean()
  available: boolean;
  @IsUUID(UUID_VERSION)
  storeId: string;
}
