
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiReviewStatus } from 'src/enums/status.enum';

export class CreateApiReviewDto {

    // @ApiProperty({ example: 'Payment API' })
    @IsString()
    apiName: string;

    // @ApiProperty({ example: 'https://api.example.com/v1/payment' })
    @IsString()
    apiEndPoint: string;

    // @ApiPropertyOptional({ example: 'Handles payment processing' })
    @IsOptional()
    @IsString()
    description?: string;

    // @ApiPropertyOptional({ example: ['payments', 'finance'] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    // @ApiPropertyOptional({ enum: ApiReviewStatus, default: ApiReviewStatus.PENDING })
    @IsOptional()
    @IsEnum(ApiReviewStatus)
    status?: ApiReviewStatus;
}