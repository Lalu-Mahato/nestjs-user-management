import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @MaxLength(32)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  mobileNumber: string;
}
