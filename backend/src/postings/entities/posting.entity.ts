import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { PostingStatus } from '../../enums/posting-status.enum';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Posting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @ManyToOne(() => Category, (category) => category.postings)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.postings, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Column({ nullable: true })
  created_by: number;

  @Column({ nullable: true })
  updated_by: number;
}

