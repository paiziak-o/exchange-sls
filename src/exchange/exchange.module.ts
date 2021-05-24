import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RateModule } from '../rate/rate.module';
import { CacheModule } from '../cache/cache.module';

import { Product } from './entities';

import { ProductsController } from './controllers/products/products.controller';
import {
  AddProductService,
  DeleteProductService,
  GetProductService,
  GetProductsService,
  GetTopProductsService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    RateModule,
    CacheModule,
  ],
  controllers: [ProductsController],
  providers: [
    AddProductService,
    DeleteProductService,
    GetProductService,
    GetProductsService,
    GetTopProductsService,
  ],
  exports: [TypeOrmModule, GetProductsService],
})
export class ExchangeModule {}
