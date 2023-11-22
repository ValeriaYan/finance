import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dto/responseDto/user-response-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async generateTokens(user: UserResponseDto) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = this.jwtService.verify(refreshToken);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = this.jwtService.verify(accessToken);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }

    const userData = this.validateRefreshToken(refreshToken);
    const user = await this.usersService.getUserByToken(refreshToken);
    if (!userData || !user) {
      throw new UnauthorizedException({
        message: 'refreshToken is outdated or incorrect',
      });
    }

    const tokens = await this.generateTokens(user);
    await this.usersService.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
