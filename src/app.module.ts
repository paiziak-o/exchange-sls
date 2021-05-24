import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config';

import { ExchangeModule } from './exchange/exchange.module';
import { RateModule } from './rate/rate.module';
import { CacheModule } from './cache/cache.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Product } from './exchange/entities/product.entity';
import { Rate } from './rate/entities';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('db');

        return ({
          ...dbConfig,
          entities: [Product, Rate],
          synchronize: true,
        });
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: configuration,
      isGlobal: true,
    }),
    ExchangeModule,
    RateModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
