import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/requestDto/create-user-request-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UserResponseDto } from './dto/responseDto/user-response-dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @Post()
  create(@Body() userRequestDto: CreateUserRequestDto) {
    return this.usersService.createUser(userRequestDto);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'user id',
    example: '1',
    required: true,
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
    description: 'Successful operation',
  })
  @Get(':id')
  getUser(@Param() params: any) {
    return this.usersService.getUser(params.id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'user id',
    example: '1',
    required: true,
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteUser(@Param() params: any) {
    return this.usersService.deleteUser(params.id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
    description: 'Successful operation',
  })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
