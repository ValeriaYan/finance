import { ApiProperty } from '@nestjs/swagger';

export class ChangeCategoryRequestDto {
  @ApiProperty({
    example: 'new name',
    description: 'category name',
    required: false,
  })
  name: string;
  @ApiProperty({
    example: 'new description',
    description: 'category description',
    required: false,
  })
  description: string;
}
