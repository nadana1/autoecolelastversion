import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  Delete,
   Param,
   ParseIntPipe,
   Put
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
  private jwtService: JwtService) {}
  /* @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }*/
  @Post('register')
  async register(
    @Body('cin') cin: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: number,
    @Body('lastName') lastName: string,
    @Body('firstName') firstName: string,
    @Body('birthdate') birthdate: Date,
    @Body('phoneNumber') phoneNumber: string,
    @Body('adress') adress: string,
    @Body('username') username: string,
  ) {
    const hashedpassword = await bcrypt.hash(password, 12);
    const userdata = this.userService.create({
      cin,
      email,
      password: hashedpassword,
      role,
      lastName,
      firstName,
      birthdate,
      phoneNumber,
      adress,
      username,

    });
  delete (await userdata).password;
  return userdata;

  }
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response,
  ) {
    const user = await this.userService.findOne({ username });

    if (!user) {
      throw new BadRequestException('Invalid Credentials !!1');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials !!2');
    }

    // generate a token
    const jwt = await this.jwtService.signAsync({cin: user.cin});
    response.cookie('jwt', jwt, {httpOnly: true});

    return {
        message: 'success'
    }
  }
  
  @Get('profile')
  async user(@Req() request: Request) {
      try {
          const cookie = request.cookies['jwt'];

          const data = await this.jwtService.verifyAsync(cookie);

          if (!data) {
              throw new UnauthorizedException();
          }

          const user = await this.userService.findOne({cin: data['cin']});

          const {password, ...result} = user;

          return result;
      } catch (e) {
          throw new UnauthorizedException();
      }
  }

  @Get('/')
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  
  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
      response.clearCookie('jwt');

      return {
          message: 'success'
      }
  }
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id:number): Promise<User> {
      return await this.userService.deleteOne(Number(id));
  }
  @Put(':id')
  async update(@Param('id') id, @Body() contactData: User): Promise<any> {
    contactData.id = Number(id);
    console.log('Update #' + contactData.id);
    return this.userService.update(id, contactData);
  }
}
