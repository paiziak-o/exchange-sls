import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExchangeModule } from '../exchange/exchange.module';
import { CacheModule } from '../cache/cache.module';

import { Rate } from './entities';
import { AddRateService } from './services/add-rate/add-rate.service';
import { UpdateRateService } from './services/update-rate/update-rate.service';
import { CryptocompareService } from './services/cryptocompare/cryptocompare.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rate]),
    forwardRef(() => ExchangeModule),
    CacheModule,
  ],
  controllers: [],
  providers: [AddRateService, UpdateRateService, CryptocompareService],
  exports: [AddRateService, UpdateRateService ],
})
export class RateModule {}
