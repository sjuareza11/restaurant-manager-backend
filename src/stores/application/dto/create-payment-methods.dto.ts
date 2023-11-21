import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaymentMethodDto } from './payment-method.dto';

export class CreatePaymentMethodsDto {
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDto)
  paymentMethods: PaymentMethodDto[];
}
