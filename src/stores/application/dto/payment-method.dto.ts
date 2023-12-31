import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaymentMethodEntity } from '../../domain/entities/payment-method';
import { PaymentMethodsConfig } from './../../domain/enums/payment-methods-config.enum';
export class PaymentMethodDto implements PaymentMethodEntity {
  @IsEnum(PaymentMethodsConfig)
  name: PaymentMethodsConfig;
  @IsOptional()
  @IsString()
  privateKey: string;
  @IsOptional()
  @IsString()
  publicKey: string;
  @IsBoolean()
  available: boolean;
  @IsUUID(UUID_VERSION)
  storeId: string;
}
