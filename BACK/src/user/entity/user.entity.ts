import internal from 'stream';
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../../exam/entity/exam.entity';
import { Session } from '../../session/entity/session.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column('varchar', { length: 8, nullable: false, unique: true }) cin: string;
  @Column('varchar', { length: 255, nullable: false }) email: string;
  @Column('text', { nullable: false }) password: string;
  @Column({ nullable: false }) role: number;
  @Column('varchar', { length: 255, nullable: false }) lastName: string;
  @Column('varchar', { length: 255, nullable: false }) firstName: string;
  @Column('date', { nullable: false }) birthdate: Date;
  @Column('varchar', { length: 255, nullable: false }) phoneNumber: string;
  @Column('varchar', { length: 255, nullable: false }) adress: string;
  @Column('varchar', { length: 255, nullable: false, unique: true })
  username: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
  @OneToMany(() => Exam, (exam) => exam.user)
  exams: Exam[];
}
