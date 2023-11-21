import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdatePaymentMethodDto } from './update-payment-method.dto';

export class UpdatePaymentMethodsDto {
  @ValidateNested({ each: true })
  @Type(() => UpdatePaymentMethodDto)
  paymentMethods: UpdatePaymentMethodDto[];
}
