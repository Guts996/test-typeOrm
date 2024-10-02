import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartItem } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Promotion } from 'src/promotion/promotions.entity';
import { PromotionsService } from 'src/promotion/promotions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product, User, Promotion]),
  ],
  providers: [CartService, ProductsService, UsersService, PromotionsService],
  controllers: [CartController],
})
export class CartModule {}
