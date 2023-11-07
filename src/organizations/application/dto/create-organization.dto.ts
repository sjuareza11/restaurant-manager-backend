import { AddressDto } from '@src/shared/application/dto/address-dto';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  taxId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
  @IsEmail()
  email: string;
  @IsUUID(UUID_VERSION)
  ownerId: string;
}
