import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/question.entity';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';

@Injectable()
export class QuestionService {
   

  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
  ) {}
  async create(data: any): Promise<Question> {
    return this.questionRepository.save(data);
  }

  async findOne(condition: any): Promise<Question> {
    return this.questionRepository.findOne(condition);
  }

  async getAllQuestion(): Promise<Question[]> {
    return await this.questionRepository
    .createQueryBuilder('c')
    .getMany();
  }

  async getQuestionById(id: number): Promise<Question> {
    return await this.questionRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<any> {
    return await (this.questionRepository.delete(id));
}

}
