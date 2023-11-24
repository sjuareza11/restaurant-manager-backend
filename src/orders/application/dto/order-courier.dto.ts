import { IsDNIOrCIF } from '@src/shared/application/validators/is-dni-or-cif';
import { IsMobilePhone, IsString, MinLength } from 'class-validator';

export class OrderCourierDto {
  @IsString()
  @IsDNIOrCIF()
  personalId: string;
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  surname: string;
  @IsString()
  @IsMobilePhone('es-ES')
  phone: string;
}
