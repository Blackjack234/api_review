import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApiReviewRepository } from './repositories/apireview.repository';
import { CreateApiReviewDto } from './dtos/apireview.dto';
import { Types } from 'mongoose';

@Injectable()
export class ApiReviewService {

    constructor(private readonly apiReviewRepository: ApiReviewRepository) { }

    async create(dto: CreateApiReviewDto, UserId: Types.ObjectId) {


        const existing = await this.apiReviewRepository.getByParam({
            UserId,
            apiEndPoint: dto.apiEndPoint,
            isDeleted: false
        })

        if (existing) {
            throw new ConflictException('you have already submitted this API endpoint.')
        }

        const payload = {
            ...dto,
            UserId
        }

        const create = await this.apiReviewRepository.create(payload)


        if (!create) {
            throw new InternalServerErrorException("Failed to save API review,Please try again.")
        }

        return {
            success: true,
            message: "API review submitted successfully.",
            data: create
        }



    }

}
