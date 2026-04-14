import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { UserRole } from "src/enums/role.enum";


export const Roles = (...role:UserRole[]):CustomDecorator<string> => {
  return SetMetadata('role',role);
}