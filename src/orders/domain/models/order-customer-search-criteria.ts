import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';

export interface OrderCustomerCriteria extends QueryOptionsDto {
  organizationId: string;
  order: string;
}
