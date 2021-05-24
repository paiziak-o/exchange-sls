import { Test, TestingModule } from '@nestjs/testing';
import { AddRateService } from './add-rate.service';

describe('AddRateService', () => {
  let service: AddRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddRateService],
    }).compile();

    service = module.get<AddRateService>(AddRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
