import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { ApiResponse } from 'src/common/types/common.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ApiResponse<User>> {
    return this.authService.register(registerUserDto);
  }
}
