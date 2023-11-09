import { GetAllOptionsDTO } from '@src/shared/domain/dto/get-all-options.dto';

export interface MenuItemsSearchCriteria extends GetAllOptionsDTO {
  storeId: string;
  menuId: string;
}
