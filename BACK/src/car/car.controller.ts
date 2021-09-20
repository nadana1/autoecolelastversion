
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Put,
    Post,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    HttpCode,
    Param,
    Delete
  } from '@nestjs/common';
  import { CarService } from './car.service';
  import { Car } from './entity/car.entity';
  import { Observable} from 'rxjs';
  


@Controller('car')
export class CarController {
constructor(private readonly carService:CarService) {}
 /*@Get("/")
  getCars(): string {
    return "cars";
  }*/
@Post('addcar')
async addcar(
  @Body('carcolor') carcolor: string,
  @Body('registrationNb') registrationNb: string,
  @Body('brand') brand: string,
  @Body('model') model: string,
  @Body('technical_visit_date') technical_visit_date: string,
  @Body('insurance_date') insurance_date: string,
  
  
) {
    return this.carService.create({
        carcolor,
        registrationNb,
        brand,
        model,
        technical_visit_date,
        insurance_date});
    }

    
@Get('/')
  async getAllCar(): Promise<Car[]> {
    return await this.carService.getAllCar();
  }

    @Get('/:id')
  async getCarById(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return await this.carService.getCarById(id);
  }

  @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Car> {
        return await this.carService.deleteOne(Number(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() contactData: Car): Promise<any> {
      contactData.id = Number(id);
      console.log('Update #' + contactData.id);
      return this.carService.update(id, contactData);
    }
}


  

