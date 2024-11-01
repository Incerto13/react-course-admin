import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entity/author.entity';
import { CreateAuthorDto } from './dto/create-author.input';
import { UpdateAuthorDto } from './dto/update-author.input';



@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthor: CreateAuthorDto): Promise<Author> {
    const { name, avgCourseRating } = createAuthor;
    const author = this.authorRepository.create({ name , avgCourseRating});
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = this.authorRepository.findOne({ where: { id } });
    if (!author) {
        throw new NotFoundException(`Author with ID: ${id} does not exist`);
      }
    return author
  }

  async updateOne(id: number, updateAuthor: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    if (!author) {
      throw new NotFoundException(`Author with ID: ${id} does not exist`);
    }
    const { name, avgCourseRating } = updateAuthor
    author.name = name;
    author.avgCourseRating = avgCourseRating;

    await this.authorRepository.save(author);
    return author;
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`Author with ID: ${id} does not exist`);
    }
  }
}