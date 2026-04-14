import { Test, TestingModule } from '@nestjs/testing';
import { ApiReviewService } from './apireview.service';

describe('ApireviewService', () => {
  let service: ApiReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiReviewService],
    }).compile();

    service = module.get<ApiReviewService>(ApiReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
