import { Test, TestingModule } from '@nestjs/testing';
import { ApireviewController } from './apireview.controller';

describe('ApireviewController', () => {
  let controller: ApireviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApireviewController],
    }).compile();

    controller = module.get<ApireviewController>(ApireviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
