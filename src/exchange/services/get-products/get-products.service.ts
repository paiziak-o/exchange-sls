import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../entities/product.entity';


@Injectable()
export class GetProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async load(): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder()
      .where('deleted_at IS NULL')
      .getMany();
  }
}
