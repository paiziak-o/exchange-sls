import { Test, TestingModule } from '@nestjs/testing';
import { GetTopProductsService } from './get-top-products.service';

describe('GetTopProductsService', () => {
  let service: GetTopProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTopProductsService],
    }).compile();

    service = module.get<GetTopProductsService>(GetTopProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
