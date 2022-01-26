import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsString({ message: 'Board name must be a string.' })
  @IsNotEmpty({ message: 'Board name can not be empty.' })
  name: string;
}
