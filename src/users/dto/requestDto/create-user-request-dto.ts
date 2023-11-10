import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'ivan', description: 'user name' })
  readonly name: string;
  @ApiProperty({ example: 'ivan.ivanov@mail.ru', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'user password' })
  readonly password: string;
}
