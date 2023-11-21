import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { PaymentMethodsConfig } from '@src/stores/domain/enums/payment-methods-config.enum';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsEnum(PaymentMethodsConfig)
  name: PaymentMethodsConfig;
  @IsOptional()
  @IsString()
  privateKey: string;
  @IsOptional()
  @IsString()
  publicKey: string;
  @IsOptional()
  @IsBoolean()
  available: boolean;
  @IsOptional()
  @IsUUID(UUID_VERSION)
  storeId: string;
}
