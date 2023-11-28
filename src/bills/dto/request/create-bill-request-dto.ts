import { ApiProperty } from '@nestjs/swagger';

export class CreateBillRequestDto {
  @ApiProperty({ example: 'bill1', description: 'bill name' })
  name: string;
  @ApiProperty({
    example: '1000',
    description: 'bill balance',
    required: false,
    default: 0,
  })
  amount: number;
  @ApiProperty({
    example: 'a card with a salary',
    description: 'bill description',
    required: false,
    default: '',
  })
  description: string;
}
