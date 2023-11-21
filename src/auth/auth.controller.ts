import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';
import { AuthResponseDto, Tokens } from './dto/responseDto/auth-response-dto';
import { Response, Request } from 'express';

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

  @ApiResponse({
    status: 201,
    description: 'Successful operation',
  })
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const { refreshToken } = req.cookies;
    res.clearCookie('refreshToken');
    return await this.authService.logout(refreshToken);
  }

  @ApiResponse({
    status: 201,
    type: Tokens,
    description: 'Successful operation',
  })
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const newTokens = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', newTokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return newTokens;
  }
}
