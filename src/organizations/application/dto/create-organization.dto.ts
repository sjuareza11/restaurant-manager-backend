import { AddressDto } from '@src/shared/application/dto/address-dto';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsString,
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
  @IsMongoId()
  ownerId: string;
}
