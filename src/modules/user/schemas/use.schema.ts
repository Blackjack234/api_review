import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { compareSync, genSalt, genSaltSync, hashSync } from "bcrypt";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User> & {
    validatePassword:(password:string)=>boolean,
    generateHash:(password:string)=>string
}
@Schema({
    timestamps:true,
    versionKey:false
})
export class User{
    @Prop({type:String,required:true})
    name:string

    @Prop({type:String,required:true})
    email:string

    @Prop({type:String,required:true})
    password:string

    @Prop({type:String,enum:["admin","dev"],default:"dev"})
    role:string

    @Prop({type:Boolean,default:false})
    isDeleted:boolean
}


export const UserSchema = SchemaFactory.createForClass(User)


UserSchema.methods.validatePassword = function (password:string) {
    return compareSync(password,this.password)
}


UserSchema.methods.generateHash = function (password:string) {
  return hashSync(password,genSaltSync(10))
}


UserSchema.pre("save",async function () {
    const user = this as UserDocument

    if(!user.isModified("password")) return ;

    const salt = await genSalt(10)
    const hash = hashSync(user.password,salt)
    user.password = hash

})

