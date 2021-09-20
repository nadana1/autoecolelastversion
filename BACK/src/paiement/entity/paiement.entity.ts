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


@Entity()
export class Paiement {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column('varchar', { length: 8, nullable: false, unique: true }) cin: string;
  @Column('varchar', { length: 255, nullable: false }) lastName: string;
  @Column('varchar', { length: 255, nullable: false }) firstName: string;
  @Column('date', { nullable: false }) paiementDate: Date;
  @Column('varchar', { length: 255, nullable: false }) montant: number;
  @Column('varchar', { length: 255, nullable: false, unique: true })
  username: string;

 
}
