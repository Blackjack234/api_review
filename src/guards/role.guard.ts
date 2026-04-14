import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/enums/role.enum";


@Injectable()
export class RBAcguard implements CanActivate {
   constructor(
    private readonly reflector:Reflector
   ){}

   canActivate(context: ExecutionContext): boolean  {
       const roles = this.reflector.get<UserRole[]>('roles',context.getHandler())
       if(!roles) return true;

       const request = context.switchToHttp().getResponse();
       return roles.includes(request?.user?.role?.role);
   }
}