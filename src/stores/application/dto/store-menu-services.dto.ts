import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { StoreServicesSalesChannel } from '@stores/domain/enums/store-services-sales-channel.enum';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class StoreMenuServiceDto {
  @IsUUID(UUID_VERSION)
  menuId: string;
  @IsEnum(StoreServicesSalesChannel)
  salesChannel: StoreServicesSalesChannel;
  @IsNumber()
  @IsPositive()
  minimumOrderAmount: number;
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
