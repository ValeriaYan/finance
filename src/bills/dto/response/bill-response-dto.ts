import { ApiProperty } from '@nestjs/swagger';

export class BillResponseDto {
  @ApiProperty({ example: '1', description: 'bill id' })
  id: number;
  @ApiProperty({ example: 'bill1', description: 'bill name' })
  name: string;
  @ApiProperty({ example: '1000', description: 'bill balance' })
  amount: number;
  @ApiProperty({
    example: 'a card with a salary',
    description: 'bill description',
  })
  description: string;
}
