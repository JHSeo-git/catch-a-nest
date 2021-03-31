import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Post } from './Post';

@Entity({ name: 'post_reads' })
export class PostRead {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ip_hash!: string;

  @ManyToOne(() => Post, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
