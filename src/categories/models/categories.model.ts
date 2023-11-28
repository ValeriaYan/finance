import { Model } from 'objection';

export class Category extends Model {
  id: number;
  name: string;
  description: string;
  user_id: number;
  type: string;

  static get tableName() {
    return 'categories';
  }
}
