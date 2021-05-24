import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Product } from '../../entities/product.entity';

@Injectable()
export class GetTopProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private configService: ConfigService,
  ) { }

  async load(limit: number, quote?: string): Promise<Product[]> {
    const { topProductLimit, defaultQuoteProduct, quoteProducts } = this.configService.get('app');
    const quoteProduct = quoteProducts.includes(quote)
      ? quote
      : defaultQuoteProduct;

    return await this.productRepository
      .query(
        `
          SELECT
            p.name,
            p.code,
            r.${quoteProduct} AS price,
            p.description
          FROM product p
          LEFT JOIN rate r ON r.productId = p.id
          WHERE p.views <> 0 AND p.deleted_at IS NULL
          ORDER BY p.views DESC
          LIMIT ?
        `,
        [ +limit || topProductLimit ]
      );
  }
}
