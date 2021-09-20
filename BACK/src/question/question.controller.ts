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
  import { QuestionService } from './question.service';
  import { Question } from './entity/question.entity';
  import { Observable} from 'rxjs';
  

@Controller('question')
export class QuestionController {
constructor(private readonly questionService:QuestionService) {}
@Post('addquestion')
async addquestion(
  @Body('statement') statement: string,
  @Body('option1') option1: string,
  @Body('option2') option2: string,
  @Body('option3') option3: string,
  @Body('option4') option4: string,
  @Body('option4') result: string,
  @Body('imgquiz') imgquiz: string,
)
{
    return this.questionService.create({
       statement,option1,option2,option3,option4,result,imgquiz});
    }


@Get('/')
  async getAllQuestion(): Promise<Question[]> {
    return await this.questionService.getAllQuestion();
  }

    @Get('/:id')
  async getQuestionById(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return await this.questionService.getQuestionById(id);
  }

  @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return await this.questionService.deleteOne(Number(id));
    }
}