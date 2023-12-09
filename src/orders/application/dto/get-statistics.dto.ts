import { IsString } from 'class-validator';

export class GetStatisticsDto {
  @IsString()
  startDate: string;
  @IsString()
  endDate: string;
}
