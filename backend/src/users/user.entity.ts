import { Cart } from 'src/cart/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'moundher@gmail.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'moundher' })
  @Column()
  name: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
