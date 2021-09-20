/*import { Session } from "inspector";*/
import internal from 'stream';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Session } from '../../session/entity/session.entity';
import { Exam } from '../../exam/entity/exam.entity';

@Entity()
export class Car  {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column('varchar', { nullable: false }) carcolor: string;
  @Column('varchar', { nullable: false }) registrationNb: string;
  @Column('varchar', { nullable: false }) brand: string;
  @Column('varchar', { nullable: false }) model: string;
  @Column('date', { nullable: false }) technical_visit_date: Date;
  @Column('date', { nullable: false }) insurance_date: Date;
  @OneToMany(() => Session, (session) => session.car)
  sessions: Session[];
  @OneToMany(() => Exam, (exam) => exam.car)
  exams: Session[];
}
