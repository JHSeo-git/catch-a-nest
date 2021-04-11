import { generateToken } from '@src/lib/token/jwt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  display_name!: string;

  @Column({ length: 255, nullable: true })
  photo_url?: string;

  @Column({ default: false })
  is_admin!: boolean;

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  generateToken() {
    return generateToken(
      {
        subject: 'accessToken',
        userId: this.id,
      },
      {
        expiresIn: '15d', // TODO: set thie to 30days later on
      }
    );
  }
}
