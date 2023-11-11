import { QueryOptionsDto } from '@src/shared/domain/dto/get-all-options.dto';

export interface MenuItemsSearchCriteria extends QueryOptionsDto {
  storeId: string;
  menuId: string;
}
