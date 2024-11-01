import { IsString, IsNumber, IsNotEmpty } from 'class-validator';


export class UpdateCourseDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
