import { Test, TestingModule } from '@nestjs/testing';
import { UpdateRateService } from './update-rate.service';

describe('UpdateRateService', () => {
  let service: UpdateRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateRateService],
    }).compile();

    service = module.get<UpdateRateService>(UpdateRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
