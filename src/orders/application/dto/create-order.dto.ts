import { AddressDto } from '@src/shared/application/dto/address-dto';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { PaymentMethodsConfig } from '@src/stores/domain/enums/payment-methods-config.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { OrderChannel } from '../../domain/enums/order-channel.enum';
import { OrderType } from '../../domain/enums/order-type.enum';
import { CreateOrderProductDto } from './create-order-product.dto';
import { CustomerDto } from './customer.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  shippingCost: number;
  @IsNumber()
  @IsPositive()
  orderAmount?: number;
  @IsNumber()
  @IsPositive()
  totalOrderAmount: number;
  @ValidateIf((dto: CreateOrderDto) => dto.type === OrderType.TAKE_AWAY)
  @IsDateString()
  @Matches(/^(\d{2}):(\d{2})$/, {
    message: 'pickupTime must be a valid time format (HH:mm)',
  })
  pickupTime?: string;
  @IsEnum(OrderType)
  type: OrderType;
  @IsEnum(OrderChannel)
  channel: OrderChannel;
  @IsEnum(PaymentMethodsConfig)
  paymentMethodName: PaymentMethodsConfig;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;
}
