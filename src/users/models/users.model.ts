import { Model } from 'objection';

export class User extends Model {
  id: number;
  token: string;
  name: string = 'user';
  email: string;
  password: string;

  static get tableName() {
    return 'users';
  }
}
