import { Body, Controller, Get, Post, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { hash, LoginDto, users } from "./user.dto";
import jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";




@Controller('auth')
export class AuthController {

  constructor(private readonly configService: ConfigService) {}

  @Post("login")
  login(@Body() { username, password }: LoginDto) {
    const user = users.find(u => u.username === username);
    if(!user) throw new UnauthorizedException("invaild username.")
    if(hash(password) !== user.password) throw new UnauthorizedException("invaild password.");
    const token = jwt.sign(user, this.configService.get("JWT_SECRET", 'JWT_SECRET'));
    return {
      ...user,
      token,
    }
  }

  @Get()
  all() {
    return 'all';
  }

  @SetMetadata('role', 'admin')
  @Get("admin")
  onlyAdmin() {
    return "admin";
  }

  @SetMetadata('role', ['vip', 'student'])
  @Get("vs")
  vipAndStudent() {
    return 'vip and student.'
  }

}