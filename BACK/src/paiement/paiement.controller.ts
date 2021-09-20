import { Controller, Get, Post , Body, ParseIntPipe,Param,Delete,Put} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { Paiement } from './entity/paiement.entity';

@Controller('paiement')
export class PaiementController {
    constructor(private paiementService:PaiementService){}

@Post('addpaiement')
async register(
  @Body('cin') cin: string,
  @Body('lastName') lastName: string,
  @Body('firstName') firstName: string,
  @Body('paiementDate') paiementDate: Date,
  @Body('montant') montant: number,
  @Body('username') username: string,
) {

  const userdata = this.paiementService.create({
    cin,
    lastName,
    firstName,
    paiementDate,
    montant,
    username,

  });
return userdata;

}
@Get('/')
  async getAllCar(): Promise<Paiement[]> {
    return await this.paiementService.getAllPaiement();
  }

    @Get('/:id')
  async getCarById(@Param('id', ParseIntPipe) id: number): Promise<Paiement> {
    return await this.paiementService.getPaiementById(id);
  }
  @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Paiement> {
        return await this.paiementService.deleteOne(Number(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() contactData: Paiement): Promise<any> {
      contactData.id = Number(id);
      console.log('Update #' + contactData.id);
      return this.paiementService.update(id, contactData);
    }
}