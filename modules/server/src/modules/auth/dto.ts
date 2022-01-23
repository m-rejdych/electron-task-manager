import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail(undefined, { message: 'Invalid email.' })
  email: string;

  @Matches(/^(?=.*\d).{4,8}$/, {
    message:
      'Password needs to be at least 4 characters long and contain at least 1 digit.',
  })
  password: string;

  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username can not be empty.' })
  username: string;
}

export class LoginDto {
  @IsEmail({ message: 'Invalid email.' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password can not be empty.' })
  password: string;
}
