import { Body, Controller, Get, Post } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { Promotion } from './promotions.entity';
import { CreatePromotionDto } from './dto/createPromotion.dto';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Get()
  async findAll(): Promise<Promotion[]> {
    return this.promotionsService.findAll();
  }

  @Post()
  async createPromotion(
    @Body() promotion: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionsService.createPromotion(promotion);
  }
  
  @Get('/available')
  async findAllAvailablePromotions(): Promise<Promotion[]> {
    return this.promotionsService.getValidPromotions();
  }
}
