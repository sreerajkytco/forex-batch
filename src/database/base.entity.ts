import { Exclude } from 'class-transformer';
import { IsDateString } from 'class-validator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsDateString()
  @CreateDateColumn()
  createdAt?: Date | string;

  @IsDateString()
  @UpdateDateColumn()
  updatedAt?: Date | string;
}
