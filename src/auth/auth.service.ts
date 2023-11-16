import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequestDto } from 'src/users/dto/requestDto/create-user-request-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/models/users.model';
import { RegistrationAuthResponseDto } from './dto/responseDto/registration-auth-response-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async login(userDto: CreateUserRequestDto) {
  // }

  async registration(
    userDto: CreateUserRequestDto,
  ): Promise<RegistrationAuthResponseDto> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate == null) {
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
    return {
      profileInfo: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      tokens: await this.generateTokens(user),
    };
  }

  async generateTokens(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }
}
