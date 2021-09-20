import internal from 'stream';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Session } from '../../session/entity/session.entity';
import { Exam } from '../../exam/entity/exam.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column('varchar', { length: 500, nullable: false }) statement: string;
  @Column('varchar', { length: 255,nullable: false }) option1: string;
  @Column('varchar', {length: 255, nullable: false }) option2: string;
  @Column('varchar', { length: 255,nullable: false }) option3: string;
  @Column('varchar', { length: 255,nullable: false }) option4: string;
  @Column('varchar', { length: 255,nullable: false }) result: string;
  @Column('varchar', { length: 255,nullable: false }) imgquiz: string;

  @ManyToMany(() => Session, (session) => session.questions)
  @JoinTable()
  sessions: Session[];
  @ManyToMany(() => Exam, (exam) => exam.questions)
  @JoinTable()
  exams: Exam[];
}
