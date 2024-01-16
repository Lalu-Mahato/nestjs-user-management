import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Not, Repository } from 'typeorm';
import { ApiResponse } from 'src/common/types/common.types';
import { CommonService } from 'src/common/common.service';
import {
  PROVIDED_EMAIL_ALREADY_EXIST,
  USER_NOT_FOUND,
} from './constants/user.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
  ) {}

  async findAll(): Promise<ApiResponse<User[]>> {
    const data = await this.userRepository.find({
      order: { updatedAt: 'DESC' },
      select: [
        'id',
        'email',
        'name',
        'mobileNumber',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });
    return this.commonService.successResponse(data);
  }

  async findOne(id: number): Promise<ApiResponse<User>> {
    const data = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'mobileNumber',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!data) {
      throw new NotFoundException(`${USER_NOT_FOUND} with Id: ${id}`);
    }
    return this.commonService.successResponse(data);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const { data } = await this.findOne(id);
    const { email } = updateUserDto;

    const isExist = await this.userRepository.findOne({
      where: { email, id: Not(id) },
    });
    if (isExist) {
      throw new NotFoundException(PROVIDED_EMAIL_ALREADY_EXIST);
    }

    Object.keys(updateUserDto).forEach((key) => {
      data[key] = updateUserDto[key];
    });
    const response = await this.userRepository.save(data);
    return this.commonService.successResponse(response);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.userRepository.delete({ id });
    throw new HttpException(null, HttpStatus.NO_CONTENT);
  }
}
