import { IsString, IsOptional, IsDecimal, IsDate } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDecimal()
  flatDiscountValue?: number;

  @IsOptional()
  @IsDecimal()
  discountPercentageValue?: number;

  @IsOptional()
  @IsDecimal()
  minPurchaseAmount?: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
