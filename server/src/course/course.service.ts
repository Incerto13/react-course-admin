import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entity/course.entity';
import { Author } from '../author/entity/author.entity';
import { CreateCourseDto } from './dto/create-course.input';
import { UpdateCourseDto } from './dto/update-course.input';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createCourse: CreateCourseDto): Promise<Course> {
    const { title, category, authorId } = createCourse;
    const course = this.courseRepository.create({ 
        title, 
        category, 
        authorId,
    });
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.createQueryBuilder('course')
    .getMany()
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.createQueryBuilder('course')
        .where('course.id = :id', { id }) 
        .getOne();

    if (!course) {
        throw new NotFoundException(`Course with ID: ${id} does not exist`);
      }
    return course
  }

  async updateOne(id: number, updateCourse: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    if (!course) {
      throw new NotFoundException(`Task with ID: ${id} does not exist`);
    }
    const { title, category, authorId } = updateCourse
    course.title = title;
    course.category = category;

    // update author
    const author = await this.authorRepository.findOne({ where: { id: authorId } });
    if (!author) {
        throw new NotFoundException(`Author with ID: ${authorId} does not exist`);
    }
    course.authorId = authorId;

    await this.courseRepository.save(course);
    return course;
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Course with ID: ${id} does not exist`);
    }
  }
}