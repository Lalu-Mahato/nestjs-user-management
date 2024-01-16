import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  generateUniqueIntegerId(): number {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * Math.pow(10, 10))
      .toString()
      .padStart(10, '0');
    const idString = `${timestamp}${randomPart}`.substr(0, 18);
    return parseInt(idString);
  }

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
