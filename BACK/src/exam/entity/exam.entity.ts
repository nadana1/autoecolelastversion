import internal from 'stream';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Car } from '../../car/entity/car.entity';
import { User } from '../../user/entity/user.entity';
import { Question } from '../../question/entity/question.entity';

@Entity()
export class Exam extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ nullable: false }) type: number;
  @Column('date', { nullable: false }) date: Date;
  @Column({ nullable: false }) duration: number;
  @Column('varchar', { length: 8, nullable: false }) monitorCin: string;
  @Column('varchar', { length: 8, nullable: false }) userCin: string;
  @Column('varchar', { nullable: false }) startTime: string;
  @Column('varchar', { length: 255, nullable: true }) plaque: string;
  @ManyToOne(() => Car, (car) => car.exams, { onDelete: 'SET NULL' })
  car: Car;
  @ManyToOne(() => User, (user) => user.exams, { onDelete: 'CASCADE' })
  user: User;
  @ManyToMany(() => Question, (question) => question.exams)
  questions: Question[];
}
