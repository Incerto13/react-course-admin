import { Course } from '../../course/entity/course.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column("decimal", { nullable: false, precision: 10, scale: 2 })
  avgCourseRating: number;

  @OneToMany(() => Course, (course) => course.author)
  courses?: Course[]
}