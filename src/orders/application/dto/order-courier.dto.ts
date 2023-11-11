import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsMobilePhone, IsString, IsUUID, MinLength } from 'class-validator';

export class OrderCourierDto {
  @IsUUID(UUID_VERSION)
  courierId: string;
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
