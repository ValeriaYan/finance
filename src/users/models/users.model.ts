import { Column, Model, Table, columnTypes } from 'nestjs-objection';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: columnTypes.increments, unique: true, primary: true })
  id: number;

  @Column({ type: columnTypes.string })
  name: string;

  @Column({ type: columnTypes.string, unique: true, nullable: false })
  email: string;

  @Column({ type: columnTypes.string, nullable: false })
  hashPassword: string;
}
