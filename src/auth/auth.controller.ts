import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';
import { AuthResponseDto } from './dto/responseDto/auth-response-dto';
import { Response } from 'express';

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
  async login(
    @Body() userDto: CreateUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.login(userDto);
    res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @ApiResponse({
    status: 201,
    type: AuthResponseDto,
    description: 'Successful operation',
  })
  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.registration(userDto);
    res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }
}
