import { PartialType } from '@nestjs/mapped-types';
import { AddressDto } from '@src/shared/application/dto/address-dto';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MinLength,
  NotContains,
  ValidateNested,
} from 'class-validator';
import { CreateStoreDto } from './create-store.dto';
import { ShippingCostsDto } from './shipping-costs.dto';
import { StoreMenuServiceDto } from './store-menu-services.dto';

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @NotContains(' ')
  @IsString()
  @Length(3, 20)
  code: string;
  @IsString()
  @MinLength(1)
  name: string;
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @IsUUID(UUID_VERSION)
  organizationId: string | any;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShippingCostsDto)
  shippingCosts: ShippingCostsDto[];
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StoreMenuServiceDto)
  storeMenuServices: StoreMenuServiceDto[];
  @IsOptional()
  @IsBoolean()
  available: boolean;
}
