import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthResponseDto } from './dto/responseDto/auth-response-dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(userDto: CreateUserRequestDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(userDto);
    const tokens = await this.tokenService.generateTokens(user);
    await this.usersService.saveRefreshToken(user.id, tokens.refreshToken);
    return {
      profileInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens,
    };
  }

  async logout(refreshToken: string) {
    return await this.usersService.removeTokenFromUser(refreshToken);
  }

  async registration(userDto: CreateUserRequestDto): Promise<AuthResponseDto> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate != null) {
      throw new HttpException(
        'User with this email is already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = await this.tokenService.generateTokens(user);
    await this.usersService.saveRefreshToken(user.id, tokens.refreshToken);
    return {
      profileInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens,
    };
  }

  private async validateUser(userDto: CreateUserRequestDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new BadRequestException({
        message: 'User with this email is not registered',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  refresh(refreshToken: string) {
    return this.tokenService.refresh(refreshToken);
  }
}
