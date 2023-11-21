import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { StoreServicesSalesChannel } from '@stores/domain/enums/store-services-sales-channel.enum';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class StoreMenuServiceDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsOptional()
  @IsUUID(UUID_VERSION)
  menuId: string;
  @IsOptional()
  @IsString()
  menuName: string;
  @IsEnum(StoreServicesSalesChannel)
  salesChannel: StoreServicesSalesChannel;
  @IsOptional()
  @IsNumber()
  @Min(0)
  minimumOrderAmount: number;
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
