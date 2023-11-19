import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async generateTokens(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1m' });
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
      throw new UnauthorizedException({ message: 'Wrong refreshToken' });
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
