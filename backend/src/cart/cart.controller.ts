import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { RemoveCartItemDto } from './dto/remove-cartItem.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-product/:userId')
  addItem(
    @Param('userId') userId: number,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addItemToCart(userId, createCartItemDto);
  }

  @Delete('remove-product/:userId')
  removeItem(
    @Param('userId') userId: number,
    @Body() removeCartItemDto: RemoveCartItemDto,
  ) {
    return this.cartService.removeItemFromCart(userId, removeCartItemDto);
  }

  @Get('currentCart/:userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Post('apply-promotion/:userId/:promotionId')
  addPromotion(
    @Param('userId') userId: number,
    @Param('promotionId') promotionId: number,
  ) {
    return this.cartService.addPromotionToCart(userId, promotionId);
  }

  @Delete('remove-promotion/:userId/:promotionId')
  removePromotion(
    @Param('userId') userId: number,
    @Param('promotionId') promotionId: number,
  ) {
    return this.cartService.removePromotionFromCart(userId, promotionId);
  }
}
