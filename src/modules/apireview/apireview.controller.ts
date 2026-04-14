import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApireviewService } from './apireview.service';
import { Roles } from 'src/common/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RBAcguard } from 'src/guards/role.guard';
import { CreateApiReviewDto } from './dtos/apireview.dto';
import { LoginUser } from 'src/common/login.decorator';
import { UserDocument } from '../user/schemas/use.schema';
import { Types } from 'mongoose';

@Controller('apireview')
export class ApireviewController {

    constructor(private readonly apiReviewService : ApireviewService){

    }

    @Post('/create')
    @Roles(UserRole.DEV)
    @UseGuards(AuthGuard('jwt'), RBAcguard)
    @HttpCode(201)
    async create(@Body() dto: CreateApiReviewDto,@LoginUser() user:Partial<UserDocument>){
       const id = new Types.ObjectId(user.id);
       return await this.apiReviewService.create(dto,id)
    }
}
