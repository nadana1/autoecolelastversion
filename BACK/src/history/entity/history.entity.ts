import internal from 'stream';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class History extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;
}
