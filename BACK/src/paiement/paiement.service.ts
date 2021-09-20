import { Injectable } from '@nestjs/common';
import { Paiement } from './entity/paiement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PaiementService {
    constructor(
        @InjectRepository(Paiement) private readonly paiementRepository: Repository<Paiement>,
      ) {}
    public async getPaiement(){
        return {};
 
    }
    async create(data: any): Promise<Paiement> {
        return this.paiementRepository.save(data);
      }
      async getAllPaiement(): Promise<Paiement[]> {
        return await this.paiementRepository
        .createQueryBuilder('c')
        .getMany();
      }
    
      async getPaiementById(id: number): Promise<Paiement> {
        return await this.paiementRepository.findOne(id);
      }
      public async update(id: number, newValue: Paiement): Promise<Paiement| null> {
        const todo = await this.paiementRepository.findOneOrFail(id);
        if (!todo.id) {
          // tslint:disable-next-line:no-console
          console.error("Todo doesn't exist");
        }
        await this.paiementRepository.update(id, newValue);
        return await this.paiementRepository.findOne(id);
      }
      async deleteOne(id: number): Promise<any> {
        return await (this.paiementRepository.delete(id));
    }
}
