import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './requestDto/create-user-request-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userRequestDto: CreateUserRequestDto) {
    return this.usersService.createUser(userRequestDto);
  }

  @Get(':id')
  getUser(@Param() params: any) {
    return this.usersService.getUser(params.id);
  }
}
