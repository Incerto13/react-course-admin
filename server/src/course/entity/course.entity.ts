import { Author } from '../../author/entity/author.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  title: string;

  @Column({ nullable: false })
  category: string;

  @ManyToOne(() => Author, author => author.courses, { eager: true,  nullable: false })
  @JoinColumn({ name: 'authorId' }) 
  author: Author

  @Column({ nullable: false })
  authorId: number;
}