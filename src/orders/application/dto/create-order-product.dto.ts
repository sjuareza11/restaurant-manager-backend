import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
  @IsUUID(UUID_VERSION)
  menuId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsInt()
  @IsPositive()
  quantity: number;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
