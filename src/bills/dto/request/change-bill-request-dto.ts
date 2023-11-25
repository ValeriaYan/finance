import { ApiProperty } from '@nestjs/swagger';

export class ChangeBillRequestDto {
  @ApiProperty({ example: 'bill1', description: 'bill name', required: false })
  name: string;
  @ApiProperty({
    example: '1000',
    description: 'bill balance',
    required: false,
  })
  amount: number;
  @ApiProperty({
    example: 'a card with a salary',
    description: 'bill description',
    required: false,
  })
  description: string;
}
