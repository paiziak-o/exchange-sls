import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { AddRateService } from '../../../rate/services/add-rate/add-rate.service';

import { Product } from '../../entities/product.entity';
import { CreateProduct } from '../../dto';

@Injectable()
export class AddProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly addRateService: AddRateService,
    private configService: ConfigService,

  ) { }

  async save(product: CreateProduct): Promise<Product> {
    const createdProduct = await this.productRepository.save(product);

    this.addRateService.save(
      createdProduct.id,
      product.price,
      this.configService.get('app.defaultQuoteProduct').toLowerCase()
    );

    return createdProduct
  }
}
