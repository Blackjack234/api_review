import { Injectable } from '@nestjs/common';
import { ApiReviewRepository } from './repositories/apireview.repository';
import { CreateApiReviewDto } from './dtos/apireview.dto';
import { Types } from 'mongoose';

@Injectable()
export class ApireviewService {

    constructor(private readonly apiReviewRepository:ApiReviewRepository){}

    async create(dto: CreateApiReviewDto,id:Types.ObjectId){
        
    }

}
