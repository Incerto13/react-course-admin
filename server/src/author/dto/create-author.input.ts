import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateAuthorDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  avgCourseRating: number;
}
