import { Promotion } from 'src/promotion/promotions.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Cart, CartItem } from '../cart.entity';
import { PromotionsService } from 'src/promotion/promotions.service';

export const validatePromotion = async (
  promotionsService: PromotionsService,
  promotionId: number,
  totalBeforeDiscount: number,
): Promise<Promotion> => {
  const promotion = await promotionsService.findById(promotionId);
  if (!promotion) {
    throw new NotFoundException('Promotion not found');
  }

  const now = new Date();
  if (promotion.startDate > now || promotion.endDate < now) {
    throw new BadRequestException('Promotion is expired');
  }

  if (promotion.minPurchaseAmount > totalBeforeDiscount) {
    throw new BadRequestException(
      'Promotion does not meet the minimum purchase amount',
    );
  }

  return promotion;
};

export const applyPromotion = (cart: Cart, promotion: Promotion): void => {
  if (!cart.appliedPromotions) {
    cart.appliedPromotions = [];
  }
  cart.appliedPromotions.push(promotion);
};

export const formatCartResponse = (cart: Cart): any => {
  return {
    id: cart.id,
    totalBeforeDiscount: cart.totalBeforeDiscount,
    totalAfterDiscount: cart.totalAfterDiscount,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      discountedPrice: item.discountedPrice || item.product.price,
      promotionId: item.promotionId,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        category: item.product.category,
      },
    })),
    appliedPromotions: cart.appliedPromotions || [],
    user: {
      id: cart.user.id,
      email: cart.user.email,
      name: cart.user.name,
    },
  };
};

export const calculateCartTotals = (
  cart: Cart,
): { totalBeforeDiscount: number; totalAfterDiscount: number } => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.items.forEach((item) => {
    totalBeforeDiscount += item.product.price * item.quantity;

    item.discountedPrice = item.product.price;

    if (cart.appliedPromotions && cart.appliedPromotions.length > 0) {
      cart.appliedPromotions.forEach((promotion) => {
        if (promotion.category) {
          if (item.product.category === promotion.category) {
            applyDiscount(promotion, item);
          }
        } else {
          applyDiscount(promotion, item);
        }
      });
    }

    totalAfterDiscount += item.discountedPrice * item.quantity;
  });

  return { totalBeforeDiscount, totalAfterDiscount };
};

const applyDiscount = (promotion: Promotion, item: CartItem) => {
  // Ensure all discount values are numbers
  const flatDiscount =
    typeof promotion.flatDiscountValue === 'number'
      ? promotion.flatDiscountValue
      : parseFloat(promotion.flatDiscountValue) || 0;

  const discountPercentage =
    typeof promotion.discountPercentageValue === 'number'
      ? promotion.discountPercentageValue
      : parseFloat(promotion.discountPercentageValue) || 0;

  // Apply flat discount first, if applicable
  if (flatDiscount > 0) {
    item.discountedPrice -= flatDiscount;
  }

  // Apply percentage discount on the updated discounted price
  if (discountPercentage > 0) {
    item.discountedPrice -= (item.discountedPrice * discountPercentage) / 100;
  }

  // Ensure the discounted price is not less than zero
  item.discountedPrice = Math.max(item.discountedPrice, 0);
};
