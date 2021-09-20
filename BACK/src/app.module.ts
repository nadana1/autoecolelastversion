import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { ExamModule } from './exam/exam.module';
import { SessionModule } from './session/session.module';
import { QuestionModule } from './question/question.module';
import { HistoryModule } from './history/history.module';
import { PaiementModule } from './paiement/paiement.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'data_base',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    CarModule,
    QuestionModule,
    ExamModule,
    SessionModule,
    PaiementModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
