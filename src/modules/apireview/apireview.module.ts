import { Module } from '@nestjs/common';
import { ApireviewController } from './apireview.controller';
import { ApiReviewService } from './apireview.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiReview, ApiReviewSchema } from './schema/apireview.schema';
import { ApiReviewRepository } from './repositories/apireview.repository';

@Module({

  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ApiReview.name,
        useFactory: () => {
          const schema = ApiReviewSchema;
          schema.index({ apiName: "text", description: "text" });
          return schema;
        }
      }
    ])
  ],
  controllers: [ApireviewController],
  providers: [ApiReviewService, ApiReviewRepository],
  exports: [ApiReviewService, ApiReviewRepository]
})
export class ApireviewModule { }
