import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rate } from '../../entities';

@Injectable()
export class AddRateService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
  ) { }

  async save(baseCode, rate: number, quoteCode: number): Promise<Rate> {
    return await this.rateRepository.save({
      product: baseCode,
      [quoteCode]: rate,
    });
  }
}
