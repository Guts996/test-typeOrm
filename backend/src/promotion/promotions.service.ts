import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Promotion } from './promotions.entity';
import { CreatePromotionDto } from './dto/createPromotion.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find();
  }

  async findById(promotionId: number): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOneBy({
      id: promotionId,
    });
    return promotion;
  }

  async createPromotion(
    createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async getValidPromotions(): Promise<Promotion[]> {
    const now = new Date();
    return this.promotionRepository.find({
      where: {
        startDate: LessThanOrEqual(now),
        endDate: MoreThanOrEqual(now),
      },
    });
  }
}
