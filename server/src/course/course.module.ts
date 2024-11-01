import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Author } from '../author/entity/author.entity';
import { AuthorModule } from '../author/author.module'


@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Author]),
    forwardRef(() => CourseModule),
    forwardRef(() => AuthorModule)
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}