import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import {
  DUPLICATE_CODE,
  EMAIL_ALREADY_TAKEN,
  INVALID_LOGIN_CREDENTIAL,
} from './constants/auth.constants';
import { AuthUtils } from './utils/auth.utils';
import { ApiResponse } from 'src/common/types/common.types';
import { CommonService } from 'src/common/common.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, TokenPayload } from './types/common.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private commonService: CommonService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<ApiResponse<User>> {
    try {
      const { password } = registerUserDto;
      const id = this.commonService.generateUniqueIntegerId();
      const hashedPassword = await AuthUtils.encryptPassword(password);
      const data = this.authRepository.create({
        id,
        ...registerUserDto,
        password: hashedPassword,
      });
      const response = await this.authRepository.save(data);
      response.password = undefined;
      return this.commonService.createdResponse(response);
    } catch (error) {
      if (error.code === DUPLICATE_CODE) {
        throw new ConflictException(EMAIL_ALREADY_TAKEN);
      }
      throw new InternalServerErrorException();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<ApiResponse<LoginResponse>> {
    const { email, password } = loginUserDto;
    const user = await this.authRepository.findOne({
      where: { email: ILike(email) },
    });
    if (!user) {
      throw new UnauthorizedException(INVALID_LOGIN_CREDENTIAL);
    }

    const isPasswordMatched = await AuthUtils.decryptPassword(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException(INVALID_LOGIN_CREDENTIAL);
    }
    user.password = undefined;
    const payload: TokenPayload = { sub: user.id, email };
    const accessToken: string = await this.jwtService.sign(payload);
    return this.commonService.successResponse({ user, accessToken });
  }
}
