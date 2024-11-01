import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateCourseDto {

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
