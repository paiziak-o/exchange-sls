import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';


@Injectable()
export class CryptocompareService {
  constructor(
    private configService: ConfigService,
  ) { }

  async getRates(baseProducts: string[], quoteProducts: string[]): Promise<any> {
    const { url, key} = this.configService.get('cryptocompare');

    return (await axios.post(
      `${url}/data/pricemulti?api_key=${key}&fsyms=${baseProducts.join(',')}&tsyms=${quoteProducts.join(',')}`
    )).data;
  }
}
