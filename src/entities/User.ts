import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ default: false })
  isPro: boolean;

  @Column({ default: false })
  isAdmin: boolean;
}