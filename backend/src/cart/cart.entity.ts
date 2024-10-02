import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Promotion } from 'src/promotion/promotions.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];

  @Column('decimal', { default: 0, precision: 10, scale: 2 })
  totalBeforeDiscount: number;

  @Column('decimal', { default: 0, precision: 10, scale: 2 })
  totalAfterDiscount: number;

  @ManyToMany(() => Promotion)
  @JoinTable({
    name: 'cart_promotions',
    joinColumn: {
      name: 'cartId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'promotionId',
      referencedColumnName: 'id',
    },
  })
  appliedPromotions: Promotion[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column('int')
  quantity: number;

  @Column('decimal', { default: 0, precision: 10, scale: 2 })
  discountedPrice: number;

  @Column({ nullable: true })
  promotionId: number;
}
