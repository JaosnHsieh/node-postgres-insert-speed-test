import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ExtraBaseEntity } from './ExtraBaseEntity';

@Entity()
export class Test extends ExtraBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  testColumn1!: string;
}
