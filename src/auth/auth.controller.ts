import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { ApiResponse } from 'src/common/types/common.types';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponse } from './types/common.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ApiResponse<User>> {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<ApiResponse<LoginResponse>> {
    return this.authService.login(loginUserDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
    return 'Hello World';
  }
}
