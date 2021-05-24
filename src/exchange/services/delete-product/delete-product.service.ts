import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../../entities/product.entity';

@Injectable()
export class DeleteProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async delete(code: string): Promise<number> {
    return (await this.productRepository.softDelete({ code })).affected;
  }
}
