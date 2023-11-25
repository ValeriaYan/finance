import { ApiProperty } from '@nestjs/swagger';

export class OperationResponseDto {
  @ApiProperty({ example: '1', description: 'operation id' })
  id: number;
  @ApiProperty({ example: '1', description: 'bill id' })
  bill_id: number;
  @ApiProperty({ example: '1', description: 'category id' })
  category_id: number;
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
