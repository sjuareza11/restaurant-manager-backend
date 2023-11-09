import { AddressDto } from '@shared/application/dto/address-dto';
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
import { ShippingCostsDto } from './shipping-costs.dto';

export class CreateStoreDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
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
  shippingCosts?: ShippingCostsDto[];
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  constructor(partial: Partial<CreateStoreDto>) {}
}
