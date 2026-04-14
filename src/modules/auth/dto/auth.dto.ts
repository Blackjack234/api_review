import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/enums/role.enum";


export class loginDto {
     
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string


    @IsString()
    @IsNotEmpty()
    password:string
}

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsEnum(UserRole,{message:"role must be either admin or dev"})
    @IsOptional()
    role:string
}

