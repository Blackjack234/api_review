import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose } from "mongoose";
import { ApiReviewStatus } from "src/enums/status.enum";



export type ApiReviewDocument = HydratedDocument<ApiReview>

@Schema({versionKey:false,timestamps:true})

export class ApiReview {

    @Prop({type:mongoose.Types.ObjectId,ref:"User",index:true,required:true})
    userId:mongoose.Types.ObjectId;


    @Prop({type:String,required:true,index:true})
    apiName:string;

    @Prop({type:String,required:true,})
    apiEndPoint:string;

    @Prop({type:String,default:''})
    description:string;

    @Prop({type:[String],default:[]})
    tags:string[];


    @Prop({type:String,enum:ApiReviewStatus,default:ApiReviewStatus.PENDING})
    status:ApiReviewStatus;


    @Prop({type:Boolean,default:false})
    isDeleted:boolean;

}

export const ApiReviewSchema = SchemaFactory.createForClass(ApiReview)