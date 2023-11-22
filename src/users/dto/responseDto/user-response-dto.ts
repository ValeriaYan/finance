import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '12', description: 'user id' })
  readonly id: number;
  @ApiProperty({ example: 'iven.ivanov@mail.ru', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: 'ivan', description: 'user name' })
  readonly name: string;
}
