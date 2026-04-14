import { Module } from '@nestjs/common';
import { ApireviewController } from './apireview.controller';
import { ApireviewService } from './apireview.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiReview, ApiReviewSchema } from './schema/apireview.schema';
import { ApiReviewRepository } from './repositories/apireview.repository';

@Module({

  imports:[
    MongooseModule.forFeatureAsync([
      {
        name:ApiReview.name,
        useFactory:()=>{
           const schema = ApiReviewSchema;
            schema.index({apiName:"text",description:"text"});
            return schema;
        }
      }
    ])
  ],
  controllers: [ApireviewController],
  providers: [ApireviewService,ApiReviewRepository],
  exports: [ApireviewService, ApiReviewRepository]
})
export class ApireviewModule {}
