import { Course } from '../../course/entity/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ type: String })
  name: string;

  @Column("decimal", { nullable: false, precision: 10, scale: 2 })
  @ApiProperty({ type: Number })
  avgCourseRating: number;

  @OneToMany(() => Course, (course) => course.author)
  courses?: Course[]
}