import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequestDto {
  @ApiProperty({ example: 'food', description: 'category name' })
  name: string;
  @ApiProperty({
    example: 'spending on food',
    description: 'category description',
    required: false,
  })
  description: string;
  @ApiProperty({
    example: 'outcome',
    description: 'category type',
    enum: ['outcome, income'],
  })
  type: string;
}
