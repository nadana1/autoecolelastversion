import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository
    .createQueryBuilder('c')
    .getMany();
  }
  async deleteOne(id: number): Promise<any> {
    return await (this.userRepository.delete(id));
}
public async update(id: number, newValue: User): Promise<User | null> {
  const todo = await this.userRepository.findOneOrFail(id);
  if (!todo.cin) {
    // tslint:disable-next-line:no-console
    console.error("Todo doesn't exist");
  }
  await this.userRepository.update(id, newValue);
  return await this.userRepository.findOne(id);
}
}
