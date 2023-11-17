import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/models/users.model';
import { AuthResponseDto } from './dto/responseDto/auth-response-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserRequestDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(user);
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
    const tokens = await this.generateTokens(user);
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

  private async generateTokens(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(userDto: CreateUserRequestDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
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
}
