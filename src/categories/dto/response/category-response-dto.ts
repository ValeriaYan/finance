import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({ example: '1', description: 'category id' })
  id: number;
  @ApiProperty({ example: '12', description: 'user id' })
  user_id: number;
  @ApiProperty({ example: 'food', description: 'category name' })
  name: string;
  @ApiProperty({
    example: 'spending on food',
    description: 'category description',
  })
  description: string;
  @ApiProperty({
    example: 'outcome',
    description: 'category type',
    enum: ['outcome, income'],
  })
  type: string;
}
