import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCourseDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
