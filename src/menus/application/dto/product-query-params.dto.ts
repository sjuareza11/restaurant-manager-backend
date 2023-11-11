import { PaginationDto } from '@src/shared/domain/dto/pagination.dto';
import { UUID_VERSION } from '@src/shared/domain/utils/uuid';
import { IsOptional, IsUUID } from 'class-validator';

export class ProductQueryParamsDto extends PaginationDto {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  categoryId: string;
}
