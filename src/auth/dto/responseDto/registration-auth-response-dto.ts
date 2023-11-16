interface profileInfo {
  id: number;
  name: string;
  email: string;
}

interface tokens {
  accessToken: string;
  refreshToken: string;
}

export class RegistrationAuthResponseDto {
  profileInfo: profileInfo;
  tokens: tokens;
}
