import { Model } from 'objection';

export class UsersBillsModel extends Model {
  user_id: number;
  bill_id: number;

  static get tableName() {
    return 'users-bills';
  }
}
