import { Module } from '@nestjs/common';
import { PaiementController } from './paiement.controller';
import { PaiementService } from './paiement.service';
import { Paiement } from './entity/paiement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Paiement])],
  controllers: [PaiementController],
  providers: [PaiementService]
})
export class PaiementModule {}
