import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, RegisterDto } from './dto/auth.dto';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RBAcguard } from 'src/guards/role.guard';
import { Roles } from 'src/common/roles.decorator';
import { LoginUser } from 'src/common/login.decorator';
import { UserDocument } from '../user/schemas/use.schema';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}


    @Post("/register")
    @HttpCode(201)
    async register(@Body() dto:RegisterDto){
      return await this.authService.register(dto);
    }


    @Post("/login")
    @HttpCode(201)
    async login(@Body() dto:loginDto){
       return await this.authService.login(dto)
    }


    @Get("/profile")
    @Roles(UserRole.DEV)
    @UseGuards(AuthGuard("jwt"),RBAcguard)
    @HttpCode(200)
    async profile(@LoginUser() user:Partial<UserDocument>){

      console.log(user,"+++++>");
      
      return await this.authService.profile(user)
    }

}
