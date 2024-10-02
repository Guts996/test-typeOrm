import { IsNotEmpty, IsNumber } from 'class-validator';

export class RemoveCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
