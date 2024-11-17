import { Author } from '../../author/entity/author.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number })
  id: number;

  @Column({ nullable: false})
  @ApiProperty({ type: String })
  title: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String })
  category: string;

  @ManyToOne(() => Author, author => author.courses, { eager: true,  nullable: false })
  @JoinColumn({ name: 'authorId' }) 
  author: Author

  @Column({ nullable: false })
  @ApiProperty({ type: Number })
  authorId: number;
}