import { Model } from 'objection';

export class Operation extends Model {
  id: number;
  description: string;
  amount: number = 0;
  category_id: number;
  bill_id: number;
  date: string;

  static get tableName() {
    return 'operations';
  }
}
