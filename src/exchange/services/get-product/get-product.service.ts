import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Product } from '../../entities/product.entity';


@Injectable()
export class GetProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private configService: ConfigService,
  ) { }

  async load(code: string, quote?: string): Promise<Product> {
    const { defaultQuoteProduct, quoteProducts } = this.configService.get('app')
    const quoteProduct = quoteProducts.includes(quote)
      ? quote
      : defaultQuoteProduct;

    let product = (await this.productRepository
      .query(
        `
          SELECT
            p.name,
            p.code,
            r.${quoteProduct} AS price,
            p.views,
            p.description
          FROM product p
          LEFT JOIN rate r ON r.productId = p.id
          WHERE p.deleted_at IS NULL AND p.code=?
        `,
        [ code ]
    ));

    if (!product[0]) {
      return null;
    }
    product = product[0];


    console.log(code)
    this.productRepository.update(
      // eslint-disable-next-line
      { code: code, deleted_at: null },
      { views: ++product.views },
    );

    return product;
  }
}
