import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { PromotionsService } from './promotion/promotions.service';
import { dummyUsers } from 'dummy-data/users';
import { dummyProducts } from 'dummy-data/products';
import { dummyPromotions } from 'dummy-data/promotions';
async function populateDatabase(
  usersService: UsersService,
  productsService: ProductsService,
  promotionsService: PromotionsService,
) {
  const users = dummyUsers;

  for (const userData of users) {
    const existingUser = await usersService.findOneByEmail(userData.email);
    if (!existingUser) {
      await usersService.create(userData);
      console.log('User created:', userData.email);
    } else {
      console.log('User already exists:', userData.email);
    }
  }

  // Load products.json
  const products = dummyProducts;

  for (const productData of products) {
    const existingProduct = await productsService.findProductById(
      productData.id,
    );
    if (!existingProduct) {
      await productsService.createProduct(productData);
      console.log('Product created:', productData.name);
    } else {
      console.log('Product already exists:', productData.name);
    }
  }

  const promotions = dummyPromotions;

  for (const promotionData of promotions) {
    const existingPromotion = await promotionsService.findById(
      promotionData.id,
    );
    if (!existingPromotion) {
      await promotionsService.createPromotion(promotionData);
      console.log('Promotion created:', promotionData.name);
    } else {
      console.log('Promotion already exists:', promotionData.name);
    }
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Izar Application Test')
    .setDescription('izar application test documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const usersService = app.get(UsersService);
  const productsService = app.get(ProductsService);
  const promotionsService = app.get(PromotionsService);

  await populateDatabase(usersService, productsService, promotionsService);

  app.enableCors();

  await app.listen(3007);
}
bootstrap();
