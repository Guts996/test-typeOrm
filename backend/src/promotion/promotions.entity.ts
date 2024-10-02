import { Cart } from 'src/cart/cart.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  flatDiscountValue: number;

  @Column('decimal', { nullable: true, precision: 5, scale: 2 })
  discountPercentageValue: number;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  minPurchaseAmount: number;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @ManyToMany(() => Cart, (cart) => cart.appliedPromotions)
  carts: Cart[];
}
