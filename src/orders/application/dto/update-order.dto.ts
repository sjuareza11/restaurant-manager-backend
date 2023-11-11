import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsEnum, IsUUID, ValidateIf, ValidateNested } from 'class-validator';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { OrderType } from '../../domain/enums/order-type.enum';
import { OrderCourierDto } from './order-courier.dto';

export class UpdateOrderDto {
  @IsUUID(UUID_VERSION)
  _id: string;
  @IsUUID(UUID_VERSION)
  storeId: string;
  @IsEnum(OrderType)
  type: OrderType;
  @IsEnum(OrderStatus)
  status: OrderStatus;
  @ValidateIf((dto: UpdateOrderDto) => dto.type !== OrderType.TAKE_AWAY)
  @ValidateNested()
  courier?: OrderCourierDto;
}
