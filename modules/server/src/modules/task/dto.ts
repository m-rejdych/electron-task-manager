import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Task name can must be a string.' })
  @IsNotEmpty({ message: 'Task name can not be empty.' })
  name: string;
}
