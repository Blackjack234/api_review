import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiReview, ApiReviewDocument } from "../schema/apireview.schema";
import { Model,QueryFilter } from "mongoose";


@Injectable()

export class ApiReviewRepository {
  
    constructor(@InjectModel(ApiReview.name) private readonly apiReviewModel:Model<ApiReviewDocument>){

    }


    async getByParam(param:any){
      return await this.apiReviewModel.findOne(param).lean();
    }


    async create(payload: Partial<ApiReview>):Promise<ApiReviewDocument>{
      return await this.apiReviewModel.create(payload)
    }
}