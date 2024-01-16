import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  successResponse<T>(
    data: T,
    statusCode: number = HttpStatus.OK,
  ): { statusCode: number; status: string; data: T } {
    return {
      statusCode,
      status: 'Success',
      data,
    };
  }

  createdResponse<T>(
    data: T,
    statusCode: number = HttpStatus.CREATED,
  ): { statusCode: number; status: string; data: T } {
    return {
      statusCode,
      status: 'Created',
      data,
    };
  }
}
