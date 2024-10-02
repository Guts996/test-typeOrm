import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { Promotion } from './promotions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  providers: [PromotionsService],
  controllers: [PromotionsController],
})
export class PromotionsModule {}
