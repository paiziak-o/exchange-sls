import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { Rate } from '../../entities';

import { GetProductsService, } from '../../../exchange/services';
import { CryptocompareService } from '../../services/cryptocompare/cryptocompare.service';

import { Product } from '../../../exchange/entities';
import { CacheService } from '../../../cache/cache.service';


@Injectable()
export class UpdateRateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    private readonly configService: ConfigService,
    private readonly getProductsService: GetProductsService,
    private readonly cryptocompareService: CryptocompareService,
    private readonly cacheService: CacheService,
  ) { }

  massUpdateCatched(): void {
    this.cacheService.thruCacheAsync(
      () => this.massUpdate(),
      `update-rates`,
      60,
    );
  }

  async massUpdate(): Promise<boolean> {
    const quoteProducts = this.configService.get('app.quoteProducts');

    const baseProducts: Product[] = await this.getProductsService.load();

    const products = baseProducts.reduce((result, product: Product) => {
      result[product.code] = product.id;

      return result;
    }, {});

    const rates = await this.cryptocompareService.getRates(Object.keys(products), quoteProducts);

    baseProducts.forEach(({ code, id }: Product) => {
      const productRates = Object.keys(rates[code]).reduce((result, quote) => {
        result[quote.toLowerCase()] = rates[code][quote];

        return result;
      }, {}) as Rate;

      this.save(id, productRates);
    })

    return true;
 }

  save(productId: number, rates: Rate): void {
     this.rateRepository
      .createQueryBuilder()
      .update(rates)
      .where('productId=:productId', { productId })
      .execute()
  }
}
