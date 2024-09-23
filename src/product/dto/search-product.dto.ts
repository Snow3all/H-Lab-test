import { IsOptional, IsString, IsInt, Min, MaxLength } from 'class-validator';

export class SearchProductsDto {
  @IsString()
  @MaxLength(255)
  query: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;
}

