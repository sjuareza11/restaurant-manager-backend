import { GetAllOptionsDTO } from '@src/shared/domain/dto/get-all-options.dto';

export interface OrderCustomerCriteria extends GetAllOptionsDTO {
  organizationId: string;
  order: string;
}
