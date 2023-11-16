import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, columnTypes } from 'nestjs-objection';

@Table({ tableName: 'users' })
export class User extends Model {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({ type: columnTypes.increments, unique: true, primary: true })
  id: number;

  @ApiProperty({
    example: 'Ivan',
    description: 'user name',
    default: 'user',
  })
  @Column({ type: columnTypes.string })
  name: string = 'user';

  @ApiProperty({ example: 'ivan.ivanov@mail.ru', description: 'user email' })
  @Column({ type: columnTypes.string, unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: '123456', description: 'user password' })
  @Column({ type: columnTypes.string, nullable: false })
  password: string;
}
