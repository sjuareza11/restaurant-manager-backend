import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsString,
  MinLength,
} from 'class-validator';

export class AddressDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsLatitude()
  latitude: string;
  @IsLongitude()
  longitude: string;
  @IsInt()
  zip: number;
  @IsString()
  @MinLength(1)
  city: string;
  @IsString()
  @MinLength(1)
  province: string;
}
