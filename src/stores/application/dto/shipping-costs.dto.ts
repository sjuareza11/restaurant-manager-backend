import { IsNumber, IsPositive, Min } from 'class-validator';

export class ShippingCostsDto {
  @IsNumber()
  @Min(0)
  fromPrice: number;
  @IsNumber()
  @Min(0)
  toPrice: number;
  @IsNumber()
  @IsPositive()
  cost: number;
}
