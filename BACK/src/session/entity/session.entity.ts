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
import { Question } from '../../question/entity/question.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({ nullable: false }) type: number;
  @Column('date', { nullable: false }) date: Date;
  @Column('varchar', { nullable: false }) startTime: string;
  @Column('varchar', { length: 8, nullable: true }) monitorCin: string;
  @Column('varchar', { length: 8, nullable: true }) userCin: string;
  @Column('varchar', { length: 255, nullable: true }) plaque: string;
  @Column({ nullable: false }) duration: number;
  
  @ManyToOne(() => Car, (car) => car.sessions, { onDelete: 'SET NULL' })
  car: Car;
  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  user: Car;
  @ManyToMany(() => Question, (question) => question.sessions)
  questions: Question[];
}
