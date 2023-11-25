import { ApiProperty } from '@nestjs/swagger';

export class ChangeOperationRequestDto {
  @ApiProperty({ example: '1', description: 'bill id', required: false })
  bill_id: number;
  @ApiProperty({ example: '1', description: 'category id', required: false })
  category_id: number;
  @ApiProperty({
    example: '1000',
    description: 'operation amount',
    required: false,
  })
  amount: number;
  @ApiProperty({
    example: 'Buy chicken meat',
    description: 'operation description',
    required: false,
  })
  description: string;
  @ApiProperty({
    example: '01-01-2023',
    description: 'operation date',
    required: false,
  })
  date: number;
}
