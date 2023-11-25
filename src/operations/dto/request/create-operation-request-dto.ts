import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationRequestDto {
  @ApiProperty({ example: '1000', description: 'operation amount' })
  amount: number;
  @ApiProperty({
    example: 'Buy chicken meat',
    description: 'operation description',
  })
  description: string;
  @ApiProperty({ example: '01-01-2023', description: 'operation date' })
  date: number;
}
