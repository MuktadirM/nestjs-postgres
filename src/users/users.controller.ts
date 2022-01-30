import { Controller, Get, Post, Body } from '@nestjs/common';
import console from 'console';
import { UserDTO } from './users.dto';
import { UserService } from './users.service';

@Controller('Users')
export class UserController {
  constructor(private serv: UserService) { }

  @Get()
  public async getAll(): Promise<UserDTO[]> {
    return await this.serv.getAll()
  }

  @Post('/create')
  public async post(@Body() dto: UserDTO): Promise<UserDTO> {
    return this.serv.create(dto);
  }

  @Get('/:id')
  public async getOne(id: string): Promise<UserDTO> {
    return await this.serv.findOne(id);
  }

}