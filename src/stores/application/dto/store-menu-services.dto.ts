import { StoreServicesSalesChannel } from '@src/stores/domain/entity/enums/store-services-sales-channel.enum';
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  Validate,
} from 'class-validator';

export class StoreMenuServiceDto {
  @IsMongoId()
  menuId: string;
  @IsMongoId()
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
