import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { StoreServicesSalesChannel } from '@stores/domain/enums/store-services-sales-channel.enum';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Validate,
} from 'class-validator';

export class StoreMenuServiceDto {
  @IsUUID(UUID_VERSION)
  menuId: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
  @Validate((value: StoreServicesSalesChannel) => {
    return Object.values(StoreServicesSalesChannel).includes(value);
  })
  salesChannel: StoreServicesSalesChannel;
  @IsNumber()
  @IsPositive()
  minimumOrderAmount: number;
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
