import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/login')
  // login(@Body() userDto: CreateUserRequestDto) {
  //   return this.authService.login(userDto);
  // }

  @Post('/registration')
  registration(@Body() userDto: CreateUserRequestDto) {
    return this.authService.registration(userDto);
  }
}
