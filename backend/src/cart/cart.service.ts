import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './cart.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cartItem.dto';
import { PromotionsService } from 'src/promotion/promotions.service';

import { RemoveCartItemDto } from './dto/remove-cartItem.dto';
import {
  validatePromotion,
  applyPromotion,
  formatCartResponse,
  calculateCartTotals,
} from './utils/cart-utils';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private usersService: UsersService,
    private productsService: ProductsService,
    private promotionsService: PromotionsService,
  ) {}

  async getAllCarts(): Promise<Cart[]> {
    return this.cartRepository.find({
      relations: ['items', 'items.product', 'appliedPromotions', 'user'],
    });
  }

  async getCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product', 'appliedPromotions', 'user'],
    });

    if (!cart) {
      const user = await this.usersService.findOneById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      cart = this.cartRepository.create({
        user,
        items: [],
        appliedPromotions: [],
      });
      cart = await this.cartRepository.save(cart);
    }

    const { totalBeforeDiscount, totalAfterDiscount } =
      calculateCartTotals(cart);
    cart.totalBeforeDiscount = totalBeforeDiscount;
    cart.totalAfterDiscount = totalAfterDiscount;

    return formatCartResponse(cart);
  }

  async addItemToCart(
    userId: number,
    createCartItemDto: CreateCartItemDto,
  ): Promise<any> {
    const cart = await this.getCart(userId);
    const { productId, quantity } = createCartItemDto;
    const product = await this.productsService.findProductById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cartItem = cart.items.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
        discountedPrice: product.price,
      });
      cart.items.push(cartItem);
    }

    const { totalBeforeDiscount, totalAfterDiscount } =
      calculateCartTotals(cart);
    cart.totalBeforeDiscount = totalBeforeDiscount;
    cart.totalAfterDiscount = totalAfterDiscount;

    await this.cartItemRepository.save(cartItem);
    await this.cartRepository.save(cart);

    return formatCartResponse(cart);
  }

  async removeItemFromCart(
    userId: number,
    removeCartItemDto: RemoveCartItemDto,
  ): Promise<Cart> {
    const { productId, quantity } = removeCartItemDto;
    const cart = await this.getCart(userId);
    const cartItem = cart.items.find((item) => item.product.id == productId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.quantity > quantity) {
      cartItem.quantity -= quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      cart.items = cart.items.filter((item) => item.product.id !== productId);
    }

    const { totalBeforeDiscount, totalAfterDiscount } =
      calculateCartTotals(cart);
    cart.totalBeforeDiscount = totalBeforeDiscount;
    cart.totalAfterDiscount = totalAfterDiscount;

    await this.cartRepository.save(cart);
    return formatCartResponse(cart);
  }

  async addPromotionToCart(userId: number, promotionId: number): Promise<Cart> {
    const cart = await this.getCart(userId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty, cannot apply promotion');
    }

    const existingPromotion = cart.appliedPromotions.find(
      (promotion) => promotion.id == promotionId,
    );

    if (existingPromotion) {
      throw new BadRequestException('Promotion already applied');
    }

    const promotion = await validatePromotion(
      this.promotionsService,
      promotionId,
      cart.totalBeforeDiscount,
    );

    applyPromotion(cart, promotion);
    const { totalBeforeDiscount, totalAfterDiscount } =
      calculateCartTotals(cart);
    cart.totalBeforeDiscount = totalBeforeDiscount;
    cart.totalAfterDiscount = totalAfterDiscount;

    await this.cartRepository.save(cart);
    return formatCartResponse(cart);
  }

  async removePromotionFromCart(
    userId: number,
    promotionId: number,
  ): Promise<Cart> {
    const cart = await this.getCart(userId);

    if (!cart.appliedPromotions || cart.appliedPromotions.length === 0) {
      throw new BadRequestException('No promotions applied');
    }

    const existingPromotionIndex = cart.appliedPromotions.findIndex(
      (promotion) => promotion.id == promotionId,
    );

    if (existingPromotionIndex === -1) {
      throw new NotFoundException('Promotion not found in cart');
    }
    cart.appliedPromotions.splice(existingPromotionIndex, 1);
    const { totalBeforeDiscount, totalAfterDiscount } =
      calculateCartTotals(cart);
    cart.totalBeforeDiscount = totalBeforeDiscount;
    cart.totalAfterDiscount = totalAfterDiscount;

    await this.cartRepository.save(cart);
    return formatCartResponse(cart);
  }
}
