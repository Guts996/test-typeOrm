import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { Promotion } from './promotion/promotions.entity';
import { PromotionsModule } from './promotion/promotions.module';
import { HealthController } from './heath-check.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST') || 'localhost',
        port: configService.get('POSTGRES_PORT') || 5432,
        username: configService.get('POSTGRES_USER') || 'postgres', //create this user if it doesn't exist
        password: configService.get('POSTGRES_PASSWORD') || 'postgres',
        database: configService.get('POSTGRES_DB') || 'izartestdb',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true, // only for development enviroment
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    CartModule,
    PromotionsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
