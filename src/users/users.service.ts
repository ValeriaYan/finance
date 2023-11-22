import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Connection,
  InjectConnection,
  InjectModel,
  synchronize,
} from 'nestjs-objection/dist';
import { User } from './models/users.model';
import { CreateUserRequestDto } from './dto/requestDto/create-user-request-dto';
import { UserResponseDto } from './dto/responseDto/user-response-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createUser(dto: CreateUserRequestDto) {
    const user = await this.userModel.query().insert(dto);
    const userResponseDto: UserResponseDto = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return userResponseDto;
  }

  async getUser(id: number) {
    await synchronize(User);
    const user = await this.userModel.query().findById(id);
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    const userResponseDto: UserResponseDto = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return userResponseDto;
  }

  async getAllUsers() {
    const users = await this.userModel.query().select();
    const userResponseDto = users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    });
    return userResponseDto;
  }

  async deleteUser(id: number) {
    await this.userModel.query().deleteById(id);
    return {};
  }

  async getUserByEmail(email: string) {
    const users = await this.userModel
      .query()
      .select()
      .where('email', '=', email);
    return users[0];
  }

  async saveRefreshToken(id: number, token: string) {
    await this.userModel.query().findById(id).patch({ token: token });
    return token;
  }

  async getUserByToken(token: string) {
    if (!token) {
      throw new BadRequestException({ message: 'User is not authorize' });
    }
    const users = await this.userModel
      .query()
      .select()
      .where('token', '=', token);
    const userResponseDto: UserResponseDto = {
      id: users[0].id,
      email: users[0].email,
      name: users[0].name,
    };
    return userResponseDto;
  }

  async removeTokenFromUser(refreshToken: string) {
    const user = await this.getUserByToken(refreshToken);
    await this.userModel.query().findById(user.id).patch({ token: null });
    return {};
  }
}
