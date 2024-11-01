import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class UpdateAuthorDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  avgCourseRating: number;
}
