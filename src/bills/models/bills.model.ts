import { Model } from 'objection';

export class Bill extends Model {
  id: number;
  name: string;
  amount: number = 0;
  description: string = '';

  static get tableName() {
    return 'bills';
  }
}
