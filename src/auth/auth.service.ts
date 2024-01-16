import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  DUPLICATE_CODE,
  EMAIL_ALREADY_TAKEN,
} from './constants/auth.constants';
import { AuthUtils } from './utils/auth.utils';
import { ApiResponse } from 'src/common/types/common.types';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private commonService: CommonService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<ApiResponse<User>> {
    try {
      const { password } = registerUserDto;
      const hashedPassword = await AuthUtils.encryptPassword(password);
      const data = this.authRepository.create({
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
}
