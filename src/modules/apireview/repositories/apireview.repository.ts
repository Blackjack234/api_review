import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiReview, ApiReviewDocument } from "../schema/apireview.schema";
import { Model } from "mongoose";


@Injectable()

export class ApiReviewRepository {
  
    constructor(@InjectModel(ApiReview.name) private readonly apiReviewModel:Model<ApiReviewDocument>){

    }


    async getByParam(param:any){
      return await this.apiReviewModel.find(param).lean();
    }
}