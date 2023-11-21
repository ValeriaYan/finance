import { ApiProperty } from '@nestjs/swagger';

class ProfileInfo {
  @ApiProperty({ example: '15', description: 'user id' })
  id: number;
  @ApiProperty({ example: 'user', description: 'user name' })
  name: string;
  @ApiProperty({ example: 'user@mail.ru', description: 'user email' })
  email: string;
}

export class Tokens {
  @ApiProperty({
    example:
      'sdkjfhsdkjvoeuohBOBObbboihFKNboUBjbkjBOiubIUbklNOihoUBkjbKJOIBOIBNjkbNKJBIUVIUVkjbjboibubiuvIUVUibjBOboiuBubbobjb',
    description: 'access token',
  })
  accessToken: string;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0QG1haWwucnUiLCJpZCI6MjAsIm5hbWUiOiJ1c2VyIiwiaWF0IjoxNzAwMjM4NzY5LCJleHAiOjE3MDI4MzA3Njl9.shQFpJ5AWfw7O_aX8jCUq8Qm1NKGXeUR9rdLwDx4NIg',
    description: 'refresh token',
  })
  refreshToken: string;
}

export class AuthResponseDto {
  @ApiProperty({ type: ProfileInfo })
  readonly profileInfo: ProfileInfo;
  @ApiProperty({ type: Tokens })
  readonly tokens: Tokens;
}
