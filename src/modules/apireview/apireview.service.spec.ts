import { Test, TestingModule } from '@nestjs/testing';
import { ApireviewService } from './apireview.service';

describe('ApireviewService', () => {
  let service: ApireviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApireviewService],
    }).compile();

    service = module.get<ApireviewService>(ApireviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
