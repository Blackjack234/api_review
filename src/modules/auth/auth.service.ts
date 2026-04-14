import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/use.schema';
import { Model } from 'mongoose';
import { loginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService:JwtService,
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>
    ){}


    async generateToken(payload:{email:string,id:string}){
      const PayloadData = {email:payload.email,userId:payload.id}

      const token = this.jwtService.sign(PayloadData)
      return token;
    }
    async register(dto:RegisterDto){
      const {email} = dto

      const existingUser = await this.userModel.findOne({email:email})

      if(existingUser){
         throw new BadRequestException("Email is already in use")
      }

      
      const user = await this.userModel.create(dto)

      if(!user){
        throw new BadRequestException("Failed to create user.")
      }


      const payload = {email:user.email,id:user._id.toString()}
      const token = await this.generateToken(payload)
     
      const {password,...userData} = user.toObject()


      return {
        message:"User registered successfully",
        data:{
            user:userData,
            access_token:token
        }
      }
     

    }

    async login(dto:loginDto){
      const {email,password} = dto

      const checkUser = await this.userModel.findOne({email:email})

      if(!checkUser){
        throw new NotFoundException("Invalid credentials.")
      }

        const isPasswordValid = await compare(password,checkUser.password)

        if(!isPasswordValid){
             throw new NotFoundException("Invalid password.")
        }

        const payload = {email:checkUser.email,id:checkUser._id.toString()}

        const token = await this.generateToken(payload)

        if(!token){
            throw new BadGatewayException("Failed to generate token.")

        }


        const {password:_,...userData} = checkUser.toObject()

        return {
            message:"Login successful",
            data:{
                user:userData,
                access_token:token
            }
        }

    }


    async profile(user:Partial<UserDocument>){
        const checkUser = await this.userModel.findById(user.id)

        if(!checkUser){
             throw new NotFoundException("User not found.")
        }

        const {password,...userData} = checkUser.toObject()

        return {
           message:"User profile retrieved successfully.",
           data:userData
        }

    }
}
