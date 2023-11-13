import { IsInt, IsLatitude, IsLongitude, IsOptional, IsString, MinLength } from 'class-validator';

export class AddressDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsLatitude()
  latitude: string;
  @IsLongitude()
  longitude: string;
  @IsOptional()
  @IsInt()
  zip: number;
  @IsOptional()
  @IsString()
  @MinLength(1)
  city: string;
  @IsOptional()
  @IsString()
  @MinLength(1)
  province: string;
}
