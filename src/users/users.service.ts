import { Injectable } from '@nestjs/common';
import {
  Connection,
  InjectConnection,
  InjectModel,
  synchronize,
} from 'nestjs-objection/dist';
import { User } from './models/users.model';
import { CreateUserRequestDto } from './dto/requestDto/create-user-request-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async createUser(dto: CreateUserRequestDto) {
    const user = await this.userModel.query().insert(dto);
    return user;
  }

  async getUser(id: number) {
    await synchronize(User);
    const user = await this.userModel.query().findById(id);
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.query().select();
    return users;
  }

  async deleteUser(id: number) {
    await this.userModel.query().deleteById(id);
    return {};
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel
      .query()
      .select()
      .where('email', '=', email);
    console.log(user);
    return user[0];
  }

  async saveRefreshToken(id: number, token: string) {
    await this.userModel.query().findById(id).patch({ token: token });
    return token;
  }
}
