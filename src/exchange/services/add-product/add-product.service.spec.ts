import { Test, TestingModule } from '@nestjs/testing';
import { AddProductService } from './add-product.service';

describe('AddProductService', () => {
  let service: AddProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddProductService],
    }).compile();

    service = module.get<AddProductService>(AddProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
