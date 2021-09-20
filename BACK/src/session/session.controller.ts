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
  import { SessionService } from './session.service';
  import { Session } from './entity/session.entity';
  import { Observable} from 'rxjs';
@Controller('session')
export class SessionController {
    constructor(private readonly sessionService:SessionService) {}
@Post('addsession')
async addsession(
  
  @Body('type') type: number,
  @Body('date') date: string,
  @Body('startTime') startTime: string,
  @Body('monitorCin') monitorCin: string,
  @Body('duration') duration: number,
  @Body('userCin') userCin : string,
  @Body('carId') carId : number,
  @Body('plaque') plaque : string,
)
{
    return this.sessionService.create({
       type,date,startTime,monitorCin,duration,userCin,carId,plaque});
    }
    @Get('/')
  async getAllSession(): Promise<Session[]> {
    return await this.sessionService.getAllSession();
  }

    @Get('/:id')
  async getSessionById(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return await this.sessionService.getSessionById(id);
  }

  @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Session> {
        return await this.sessionService.deleteOne(Number(id));
    }
    @Put(':id')
  async update(@Param('id') id, @Body() contactData: Session): Promise<any> {
    contactData.id = Number(id);
    console.log('Update #' + contactData.id);
    return this.sessionService.update(id, contactData);
  }
}
