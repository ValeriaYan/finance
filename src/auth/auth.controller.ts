import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';
import { AuthResponseDto } from './dto/responseDto/auth-response-dto';

@ApiTags('Auth')
@ApiBasicAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    type: AuthResponseDto,
    description: 'Successful operation',
  })
  @Post('/login')
  login(@Body() userDto: CreateUserRequestDto) {
    return this.authService.login(userDto);
  }

  @ApiResponse({
    status: 201,
    type: AuthResponseDto,
    description: 'Successful operation',
  })
  @Post('/registration')
  registration(@Body() userDto: CreateUserRequestDto) {
    return this.authService.registration(userDto);
  }
}
