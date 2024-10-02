import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    return product;
  }

  async removeProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsRepository.remove(product);
  }
}
